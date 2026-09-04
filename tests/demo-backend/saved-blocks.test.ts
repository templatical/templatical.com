import { describe, expect, it } from 'vitest';
import type { Block } from '@templatical/types';
import { createStore, memoryStorage } from '@/lib/demo-backend/store';
import { createSavedBlocksProvider } from '@/lib/demo-backend/saved-blocks';

const blocks = (marker: string): Block[] =>
    [{ id: marker, type: 'paragraph', content: marker }] as unknown as Block[];

function setup() {
    const provider = createSavedBlocksProvider(createStore(memoryStorage()));
    if (typeof provider.create !== 'function') throw new Error('create must be a function');
    if (typeof provider.update !== 'function') throw new Error('update must be a function');
    if (typeof provider.delete !== 'function') throw new Error('delete must be a function');
    return { provider, create: provider.create, update: provider.update, remove: provider.delete };
}

describe('createSavedBlocksProvider', () => {
    it('starts empty', async () => {
        expect(await setup().provider.list()).toEqual([]);
    });

    it('create() assigns the id — the editor never generates one', async () => {
        const { create, provider } = setup();

        const entry = await create({ name: 'Footer', content: blocks('a'), category: 'Brand' });

        expect(entry.id).toEqual(expect.any(String));
        expect(entry.name).toBe('Footer');
        expect(entry.category).toBe('Brand');

        // The return value alone would still pass if create() never wrote the
        // entry back — confirm the store itself carries it.
        const [stored] = await provider.list();
        expect(stored?.id).toBe(entry.id);
        expect(stored?.name).toBe('Footer');
        expect(stored?.category).toBe('Brand');
        expect(stored?.content).toEqual(blocks('a'));
    });

    it('update() merges only the keys present', async () => {
        const { create, update, provider } = setup();
        const entry = await create({ name: 'Footer', content: blocks('a'), category: 'Brand' });

        const renamed = await update(entry.id, { name: 'Footer v2' });

        expect(renamed.name).toBe('Footer v2');
        expect(renamed.category).toBe('Brand');
        expect(renamed.content).toEqual(blocks('a'));

        // Confirm the merge landed in the store, not just the return value.
        const [stored] = await provider.list();
        expect(stored?.name).toBe('Footer v2');
        expect(stored?.category).toBe('Brand');
        expect(stored?.content).toEqual(blocks('a'));
    });

    it('update() with an empty category clears it, distinct from omitting the key', async () => {
        const { create, update, provider } = setup();
        const entry = await create({ name: 'Footer', content: blocks('a'), category: 'Brand' });

        // An empty patch changes nothing — category is left standing.
        const untouched = await update(entry.id, {});
        expect(untouched.category).toBe('Brand');

        // An explicit empty string clears it — a different patch, a
        // different result, not just "one of the two works".
        const cleared = await update(entry.id, { category: '' });
        expect(cleared.category).toBe('');

        const [stored] = await provider.list();
        expect(stored?.category).toBe('');
    });

    it('delete() removes only the targeted entry', async () => {
        const { create, remove, provider } = setup();
        const keep = await create({ name: 'Header', content: blocks('a') });
        const gone = await create({ name: 'Footer', content: blocks('b') });

        await remove(gone.id);

        const remaining = await provider.list();
        expect(remaining).toHaveLength(1);
        expect(remaining[0]?.id).toBe(keep.id);
    });

    it('update() rejects for an unknown id', async () => {
        const { update } = setup();

        await expect(update('nope', { name: 'x' })).rejects.toThrow(/nope/);
    });
});
