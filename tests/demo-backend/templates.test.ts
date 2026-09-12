import { describe, expect, it } from 'vitest';
import type { TemplateContent } from '@templatical/types';
import { createStore, memoryStorage, TEMPLATE_ID } from '@/lib/demo-backend/store';
import { createVersionStore } from '@/lib/demo-backend/version-store';
import { createTemplatesProvider, hasStoredTemplate } from '@/lib/demo-backend/templates';

const content = (marker: string): TemplateContent =>
    ({
        settings: {},
        blocks: [{ id: marker, type: 'paragraph', content: marker }],
    }) as unknown as TemplateContent;

function setup() {
    const store = createStore(memoryStorage());
    const versions = createVersionStore(store);
    const provider = createTemplatesProvider(store, versions);
    if (typeof provider.create !== 'function') throw new Error('create must be a function');
    if (typeof provider.save !== 'function') throw new Error('save must be a function');
    return { store, versions, provider, create: provider.create, save: provider.save };
}

describe('createTemplatesProvider', () => {
    it('create() returns the pinned id and stamps createdAt only', async () => {
        const { create } = setup();

        const template = await create({ name: 'Welcome', content: content('a') });

        expect(template.id).toBe(TEMPLATE_ID);
        expect(template.name).toBe('Welcome');
        expect(template.createdAt).toEqual(expect.any(String));
        // Stamping updatedAt here would claim an update that never happened: the
        // header prefers updatedAt and labels it "Updated", so a brand-new
        // template would read "Updated just now" before anyone edited anything.
        expect(template.updatedAt).toBeUndefined();
    });

    it('save() stamps updatedAt and merges the patch', async () => {
        const { create, save } = setup();
        await create({ name: 'Welcome', content: content('a') });

        const saved = await save(TEMPLATE_ID, { content: content('b') });

        expect(saved.updatedAt).toEqual(expect.any(String));
        expect(saved.name).toBe('Welcome');
        expect(saved.content).toEqual(content('b'));
    });

    it('save() records a version when the patch carries content', async () => {
        const { create, save, versions } = setup();
        await create({ name: 'Welcome', content: content('a') });

        await save(TEMPLATE_ID, { content: content('b') });

        expect(versions.read()).toHaveLength(1);
        expect(versions.read()[0]?.isAutomatic).toBe(true);
    });

    it('save() records nothing for a rename-only patch', async () => {
        const { create, save, versions } = setup();
        await create({ name: 'Welcome', content: content('a') });

        await save(TEMPLATE_ID, { name: 'Renamed' });

        expect(versions.read()).toHaveLength(0);
    });

    it('load() returns the stored template', async () => {
        const { create, provider } = setup();
        await create({ name: 'Welcome', content: content('a') });

        expect((await provider.load(TEMPLATE_ID)).content).toEqual(content('a'));
    });

    it('load() rejects for an unknown id with a message written for a reader', async () => {
        const { provider } = setup();

        await expect(provider.load('nope')).rejects.toThrow(/nope/);
    });

    it('hasStoredTemplate reflects whether create() has run', async () => {
        const { store, create } = setup();

        expect(hasStoredTemplate(store)).toBe(false);
        await create({ name: 'Welcome', content: content('a') });
        expect(hasStoredTemplate(store)).toBe(true);
    });
});
