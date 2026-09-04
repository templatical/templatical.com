import { describe, expect, it } from 'vitest';
import type { Comment, TemplateContent } from '@templatical/types';
import { createStore, memoryStorage } from '@/lib/demo-backend/store';
import { createVersionStore } from '@/lib/demo-backend/version-store';
import { COMMENTS_KEY } from '@/lib/demo-backend/comments';
import {
    ensureSeeded,
    SEED_ANCHOR_BLOCK_ID,
    SEEDED_AUTHOR_ID,
} from '@/lib/demo-backend/seed';

const COPY = { reviewerName: 'Sam Okafor', threadBody: 'CTA reads weak', replyBody: 'Try imperative' };

const baseContent = (): TemplateContent =>
    ({
        settings: { backgroundColor: '#ffffff' },
        blocks: [
            { id: 'hero-headline', type: 'title', content: 'Welcome' },
            { id: SEED_ANCHOR_BLOCK_ID, type: 'button', text: 'Open your dashboard', backgroundColor: '#0f172a' },
        ],
    }) as unknown as TemplateContent;

function setup() {
    const store = createStore(memoryStorage());
    const versions = createVersionStore(store);
    return { store, versions };
}

describe('ensureSeeded', () => {
    it('seeds one unresolved thread with a reply, anchored to the CTA', () => {
        const { store, versions } = setup();

        ensureSeeded(store, versions, baseContent(), COPY);

        const threads = store.read<Comment[]>(COMMENTS_KEY) ?? [];
        expect(threads).toHaveLength(1);
        expect(threads[0]?.blockId).toBe(SEED_ANCHOR_BLOCK_ID);
        expect(threads[0]?.resolvedAt).toBeNull();
        expect(threads[0]?.replies).toHaveLength(1);
    });

    it('attributes seeded comments to someone other than the visitor', () => {
        const { store, versions } = setup();

        ensureSeeded(store, versions, baseContent(), COPY);

        const threads = store.read<Comment[]>(COMMENTS_KEY) ?? [];
        // The visitor is `you`. A different author id is what makes the
        // editor withhold edit/delete on seeded comments — the ownership
        // check demonstrating itself.
        expect(threads[0]?.author.id).toBe(SEEDED_AUTHOR_ID);
        expect(threads[0]?.author.id).not.toBe('you');
        expect(threads[0]?.author.name).toBe('Sam Okafor');
    });

    it('seeds versions whose content differs from the live template', () => {
        const { store, versions } = setup();

        ensureSeeded(store, versions, baseContent(), COPY);

        const stored = versions.read();
        expect(stored.length).toBeGreaterThanOrEqual(3);
        // Non-negotiable: identical content means previewing a version shows an
        // unchanged canvas and the feature reads as broken.
        for (const version of stored) {
            expect(version.content).not.toEqual(baseContent());
        }
    });

    it('seeds versions oldest-last with distinct timestamps', () => {
        const { store, versions } = setup();

        ensureSeeded(store, versions, baseContent(), COPY);

        const times = versions.read().map((v) => Date.parse(v.createdAt));
        expect(new Set(times).size).toBe(times.length);
        expect([...times].sort((a, b) => b - a)).toEqual(times);
    });

    it('is idempotent — a second call adds nothing', () => {
        const { store, versions } = setup();

        ensureSeeded(store, versions, baseContent(), COPY);
        const afterFirst = versions.read().length;
        ensureSeeded(store, versions, baseContent(), COPY);

        expect(versions.read()).toHaveLength(afterFirst);
        expect(store.read<Comment[]>(COMMENTS_KEY)).toHaveLength(1);
    });

    it('does not overwrite a visitor comment made before it runs again', () => {
        const { store, versions } = setup();
        ensureSeeded(store, versions, baseContent(), COPY);
        const threads = store.read<Comment[]>(COMMENTS_KEY) ?? [];
        store.write(COMMENTS_KEY, [
            ...threads,
            { id: 'mine', body: 'Mine', author: { id: 'you', name: 'You' }, createdAt: new Date().toISOString(), resolvedAt: null },
        ]);

        ensureSeeded(store, versions, baseContent(), COPY);

        expect(store.read<Comment[]>(COMMENTS_KEY)).toHaveLength(2);
    });
});
