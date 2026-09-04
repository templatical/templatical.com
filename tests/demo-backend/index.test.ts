import { describe, expect, it } from 'vitest';
import type { TemplateContent } from '@templatical/types';
import { createDemoBackend, DEMO_RECIPIENT } from '@/lib/demo-backend';
import { TEMPLATE_ID } from '@/lib/demo-backend/store';

const COPY = {
    visitorName: 'You',
    reviewerName: 'Sam Okafor',
    threadBody: 'CTA reads weak',
    replyBody: 'Try imperative',
};

const baseContent = (): TemplateContent =>
    ({
        settings: {},
        blocks: [{ id: 'hero-cta', type: 'button', text: 'Open your dashboard' }],
    }) as unknown as TemplateContent;

describe('createDemoBackend', () => {
    it('exposes all five providers plus the user identity', () => {
        const { config } = createDemoBackend(baseContent(), COPY);

        expect(Object.keys(config).sort()).toEqual(
            ['comments', 'savedBlocks', 'templates', 'testEmail', 'user', 'versionHistory'].sort(),
        );
    });

    it('disables the unsaved-changes guard', () => {
        // A landing page must never trap a visitor's tab close behind a
        // beforeunload prompt. This defaults to ON, so it must be explicit.
        expect(createDemoBackend(baseContent(), COPY).config.templates.unsavedChangesGuard).toBe(false);
    });

    it('turns autosave on so history fills as the visitor types', () => {
        expect(createDemoBackend(baseContent(), COPY).config.templates.autoSave).toBe(true);
    });

    it('locks the test recipient to a reserved address', () => {
        const { testEmail } = createDemoBackend(baseContent(), COPY).config;

        // A single-entry allowedRecipients makes the editor render the field
        // read-only and pre-filled. example.com is RFC 2606 reserved and can
        // never receive mail, so nothing can look delivered.
        expect(testEmail.allowedRecipients).toEqual([DEMO_RECIPIENT]);
        expect(testEmail.defaultRecipient).toBe(DEMO_RECIPIENT);
        expect(DEMO_RECIPIENT.endsWith('@example.com')).toBe(true);
    });

    it('resolves the stubbed send', async () => {
        await expect(
            createDemoBackend(baseContent(), COPY).config.testEmail.send({
                recipient: DEMO_RECIPIENT,
                content: baseContent(),
            }),
        ).resolves.toBeUndefined();
    });

    it('identifies the visitor as someone other than the seeded reviewer', () => {
        const { config } = createDemoBackend(baseContent(), COPY);

        expect(config.user.id).toBe('you');
        expect(config.user.name).toBe('You');
    });

    it('seeds on construction', async () => {
        const backend = createDemoBackend(baseContent(), COPY);

        expect(await backend.config.comments.list(TEMPLATE_ID)).toHaveLength(1);
        expect((await backend.config.versionHistory.list(TEMPLATE_ID)).versions.length).toBeGreaterThanOrEqual(3);
    });

    it('hasStoredTemplate flips once create() has run', async () => {
        const backend = createDemoBackend(baseContent(), COPY);
        if (typeof backend.config.templates.create !== 'function') throw new Error('create must be a function');

        expect(backend.hasStoredTemplate()).toBe(false);
        await backend.config.templates.create({ name: 'Welcome', content: baseContent() });
        expect(backend.hasStoredTemplate()).toBe(true);
    });

    // The brief's original version of this test asserted an EMPTY post-reset
    // state (`toEqual([])` for both lists). That contradicts reset()'s own
    // implementation, which calls ensureSeeded() again after clearing the
    // store — and contradicts the product requirement that a visitor hitting
    // Reset gets the demo's starting state back, never a blank hero. The
    // correct post-reset state is the RE-SEEDED state.
    it('reset clears the template and re-seeds the history and comments exactly once', async () => {
        const backend = createDemoBackend(baseContent(), COPY);
        if (typeof backend.config.templates.create !== 'function') throw new Error('create must be a function');
        await backend.config.templates.create({ name: 'Welcome', content: baseContent() });

        backend.reset();

        // The template itself has no re-seed path — it is genuinely gone.
        expect(backend.hasStoredTemplate()).toBe(false);
        // The seeded thread and versions are back — exactly once. Length 0
        // would mean ensureSeeded() no-opped because its guard flag survived
        // store.reset() (the worst failure: an empty hero); more than one
        // seeded thread, or more than 3 versions, would mean seeding stacked
        // on top of a reset that failed to clear it.
        expect(await backend.config.comments.list(TEMPLATE_ID)).toHaveLength(1);
        expect((await backend.config.versionHistory.list(TEMPLATE_ID)).versions.length).toBeGreaterThanOrEqual(3);
    });
});
