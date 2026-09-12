import { describe, expect, it } from 'vitest';
import type { TemplateContent } from '@templatical/types';
import { createStore, memoryStorage, TEMPLATE_ID } from '@/lib/demo-backend/store';
import { createVersionStore, HYDRATED_VERSIONS } from '@/lib/demo-backend/version-store';
import { createTemplatesProvider } from '@/lib/demo-backend/templates';
import { createVersionHistoryProvider } from '@/lib/demo-backend/versions';

const content = (marker: string): TemplateContent =>
    ({
        settings: {},
        blocks: [{ id: marker, type: 'paragraph', content: marker }],
    }) as unknown as TemplateContent;

function setup() {
    const store = createStore(memoryStorage());
    const versions = createVersionStore(store);
    const templates = createTemplatesProvider(store, versions);
    const history = createVersionHistoryProvider(versions, templates);
    return { store, versions, templates, history };
}

describe('createVersionHistoryProvider', () => {
    it('hydrates only the newest HYDRATED_VERSIONS entries', async () => {
        const { versions, history } = setup();
        for (let i = 0; i < HYDRATED_VERSIONS + 2; i += 1) versions.append(content(`v${i}`), true);

        const { versions: listed } = await history.list(TEMPLATE_ID);

        expect(listed).toHaveLength(HYDRATED_VERSIONS + 2);
        expect(listed.slice(0, HYDRATED_VERSIONS).every((v) => v.content !== undefined)).toBe(true);
        expect(listed.slice(HYDRATED_VERSIONS).every((v) => v.content === undefined)).toBe(true);
    });

    it('get() returns a version content by id', async () => {
        const { versions, history } = setup();
        const stored = versions.append(content('target'), true);

        expect(await history.get(TEMPLATE_ID, stored.id)).toEqual(content('target'));
    });

    it('get() rejects for an unknown version id', async () => {
        const { history } = setup();

        await expect(history.get(TEMPLATE_ID, 'nope')).rejects.toThrow(/nope/);
    });

    it('create() records a manual version', async () => {
        const { history, versions } = setup();
        if (typeof history.create !== 'function') throw new Error('create must be a function');

        const created = await history.create(TEMPLATE_ID, content('manual'));

        expect(created.isAutomatic).toBe(false);
        expect(created.content).toEqual(content('manual'));
        expect(versions.read()).toHaveLength(1);
        expect(versions.read()[0]?.isAutomatic).toBe(false);
    });

    it('restore() writes the old content back through templates.save', async () => {
        const { history, templates, versions } = setup();
        if (typeof templates.create !== 'function') throw new Error('create must be a function');
        if (typeof history.restore !== 'function') throw new Error('restore must be a function');
        await templates.create({ name: 'Welcome', content: content('current') });
        const old = versions.append(content('old'), true);

        const restored = await history.restore(TEMPLATE_ID, old.id);

        expect(restored.content).toEqual(content('old'));
        // Append-only for free: this store's save() records a version, so the
        // pre-restore state is still reachable.
        expect(versions.read().length).toBeGreaterThan(1);
    });
});
