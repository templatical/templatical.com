import { describe, expect, it } from 'vitest';
import type { CommentAuthor } from '@templatical/types';
import { createStore, memoryStorage, TEMPLATE_ID } from '@/lib/demo-backend/store';
import { createCommentsProvider } from '@/lib/demo-backend/comments';

const VISITOR: CommentAuthor = { id: 'you', name: 'You' };

function setup() {
    const store = createStore(memoryStorage());
    const provider = createCommentsProvider(store, VISITOR);
    if (typeof provider.create !== 'function') throw new Error('create must be a function');
    if (typeof provider.update !== 'function') throw new Error('update must be a function');
    if (typeof provider.delete !== 'function') throw new Error('delete must be a function');
    if (typeof provider.setResolved !== 'function')
        throw new Error('setResolved must be a function');
    return {
        store,
        provider,
        create: provider.create,
        update: provider.update,
        remove: provider.delete,
        setResolved: provider.setResolved,
    };
}

describe('createCommentsProvider', () => {
    it('create() stores a root anchored to a block, authored by this session', async () => {
        const { create, provider } = setup();

        const comment = await create(TEMPLATE_ID, { body: 'Tighten this', blockId: 'hero-cta' });

        expect(comment.id).toEqual(expect.any(String));
        expect(comment.author).toEqual(VISITOR);
        expect(comment.blockId).toBe('hero-cta');
        expect(comment.parentId).toBeNull();
        // Stamping updatedAt on creation makes every comment render "(edited)".
        expect(comment.updatedAt).toBeUndefined();

        // Assert against what list() reads back too, so a create() that
        // returns a plausible object without ever persisting it would fail
        // this test.
        const [stored] = await provider.list(TEMPLATE_ID);
        expect(stored?.id).toBe(comment.id);
        expect(stored?.author).toEqual(VISITOR);
        expect(stored?.blockId).toBe('hero-cta');
        expect(stored?.parentId).toBeNull();
        expect(stored?.updatedAt).toBeUndefined();
    });

    it('create() with parentId nests under the root rather than adding a thread', async () => {
        const { create, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });

        await create(TEMPLATE_ID, { body: 'Reply', parentId: root.id });

        const threads = await provider.list(TEMPLATE_ID);
        expect(threads).toHaveLength(1);
        expect(threads[0]?.replies).toHaveLength(1);
        expect(threads[0]?.replies?.[0]?.body).toBe('Reply');
    });

    it('create() replying to a reply flattens into the root thread, with parentId corrected to the root', async () => {
        const { create, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });
        const firstReply = await create(TEMPLATE_ID, { body: 'First reply', parentId: root.id });

        // Reply to the reply, not to the root.
        await create(TEMPLATE_ID, { body: 'Reply to a reply', parentId: firstReply.id });

        const threads = await provider.list(TEMPLATE_ID);
        expect(threads).toHaveLength(1);
        expect(threads[0]?.replies).toHaveLength(2);
        // The stored parentId must name the root it actually lives under,
        // not the reply it was addressed to — otherwise the record points
        // at a comment that isn't a top-level thread anywhere in the store.
        expect(threads[0]?.replies?.[1]?.parentId).toBe(root.id);
    });

    it('update() sets updatedAt so the "(edited)" marker appears', async () => {
        const { create, update, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Before', blockId: 'hero-cta' });

        const edited = await update(TEMPLATE_ID, root.id, { body: 'After' });

        expect(edited.body).toBe('After');
        expect(edited.updatedAt).toEqual(expect.any(String));
        // The return value alone would still pass if update() never wrote the
        // change back — confirm the store itself carries the edit.
        const [stored] = await provider.list(TEMPLATE_ID);
        expect(stored?.body).toBe('After');
        expect(stored?.updatedAt).toEqual(expect.any(String));
    });

    it('update() reaches a reply, not just a root', async () => {
        const { create, update, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });
        const reply = await create(TEMPLATE_ID, { body: 'Before', parentId: root.id });

        const updated = await update(TEMPLATE_ID, reply.id, { body: 'After' });
        expect(updated.body).toBe('After');

        const [thread] = await provider.list(TEMPLATE_ID);
        expect(thread?.replies?.[0]?.body).toBe('After');
    });

    it('delete() on a root removes its replies with it', async () => {
        const { create, remove, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });
        await create(TEMPLATE_ID, { body: 'Reply', parentId: root.id });

        await remove(TEMPLATE_ID, root.id);

        expect(await provider.list(TEMPLATE_ID)).toEqual([]);
    });

    it('delete() on a reply leaves the root standing', async () => {
        const { create, remove, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });
        const reply = await create(TEMPLATE_ID, { body: 'Reply', parentId: root.id });

        await remove(TEMPLATE_ID, reply.id);

        const threads = await provider.list(TEMPLATE_ID);
        expect(threads).toHaveLength(1);
        expect(threads[0]?.replies ?? []).toEqual([]);
    });

    it('setResolved takes a target state, so repeating it is idempotent', async () => {
        const { create, setResolved, provider } = setup();
        const root = await create(TEMPLATE_ID, { body: 'Root', blockId: 'hero-cta' });

        const once = await setResolved(TEMPLATE_ID, root.id, true);
        const twice = await setResolved(TEMPLATE_ID, root.id, true);

        // Two clicks in flight must not end up inverted.
        expect(once.resolvedAt).toEqual(expect.any(String));
        expect(twice.resolvedAt).toEqual(expect.any(String));
        expect(twice.resolvedBy).toEqual(VISITOR);

        const [resolvedInStore] = await provider.list(TEMPLATE_ID);
        expect(resolvedInStore?.resolvedAt).toEqual(expect.any(String));
        expect(resolvedInStore?.resolvedBy).toEqual(VISITOR);

        const reopened = await setResolved(TEMPLATE_ID, root.id, false);
        expect(reopened.resolvedAt).toBeNull();
        expect(reopened.resolvedBy).toBeNull();

        const [reopenedInStore] = await provider.list(TEMPLATE_ID);
        expect(reopenedInStore?.resolvedAt).toBeNull();
        expect(reopenedInStore?.resolvedBy).toBeNull();
    });

    it('list() on an empty store returns an array, not null', async () => {
        expect(await setup().provider.list(TEMPLATE_ID)).toEqual([]);
    });
});
