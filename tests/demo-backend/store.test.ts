import { describe, expect, it } from 'vitest';
import type { StorageLike } from '@/lib/demo-backend/store';
import { createStore, memoryStorage, NS } from '@/lib/demo-backend/store';

describe('createStore', () => {
    it('round-trips a value under the namespace', () => {
        const storage = memoryStorage();
        const store = createStore(storage);

        store.write('template', { id: 'hero-demo', name: 'Welcome' });

        expect(store.read('template')).toEqual({ id: 'hero-demo', name: 'Welcome' });
        expect(storage.getItem(`${NS}template`)).toBe(
            JSON.stringify({ id: 'hero-demo', name: 'Welcome' }),
        );
    });

    it('reads an absent key as null', () => {
        expect(createStore(memoryStorage()).read('nothing')).toBeNull();
    });

    it('heals a corrupt record by reading it as absent', () => {
        const storage = memoryStorage();
        storage.setItem(`${NS}template`, '{ not json');

        expect(createStore(storage).read('template')).toBeNull();
    });

    it('reset clears only this namespace', () => {
        const storage = memoryStorage();
        storage.setItem('unrelated:key', 'keep me');
        const store = createStore(storage);
        store.write('template', { id: 'x' });
        store.write('comments', []);

        store.reset();

        expect(store.read('template')).toBeNull();
        expect(store.read('comments')).toBeNull();
        expect(storage.getItem('unrelated:key')).toBe('keep me');
    });

    it('falls back to memory when the storage accessor throws', () => {
        const hostile: StorageLike = {
            get length(): number { throw new Error('blocked'); },
            getItem() { throw new Error('blocked'); },
            setItem() { throw new Error('blocked'); },
            removeItem() { throw new Error('blocked'); },
            key() { throw new Error('blocked'); },
        };
        const store = createStore(hostile);

        // Must not throw, and must still behave like a store.
        store.write('template', { id: 'x' });
        expect(store.read('template')).toEqual({ id: 'x' });
    });
});
