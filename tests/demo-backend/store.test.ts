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

    it('degrades without throwing when the storage accessor is hostile', () => {
        const hostile: StorageLike = {
            get length(): number {
                throw new Error('blocked');
            },
            getItem() {
                throw new Error('blocked');
            },
            setItem() {
                throw new Error('blocked');
            },
            removeItem() {
                throw new Error('blocked');
            },
            key() {
                throw new Error('blocked');
            },
        };
        const store = createStore(hostile);

        // Every operation must complete rather than throw, and since nothing
        // can actually be stored, a read must come back null rather than
        // resurrecting a value from some fallback the caller didn't ask for.
        expect(() => store.write('template', { id: 'x' })).not.toThrow();
        expect(() => store.reset()).not.toThrow();
        expect(store.read('template')).toBeNull();
    });

    it('keeps earlier writes readable after storage starts throwing mid-session', () => {
        // Regression test: an earlier version of createStore swapped the
        // entire backing storage for a fresh, empty in-memory map on the
        // first throw, which orphaned everything written before that point.
        // A storage that works, then breaks, must not lose what it already
        // holds — only the failing operation should be affected.
        const map = new Map<string, string>();
        let broken = false;
        const flaky: StorageLike = {
            get length() {
                return map.size;
            },
            getItem: (key) => map.get(key) ?? null,
            setItem: (key, value) => {
                if (broken) throw new Error('quota exceeded');
                map.set(key, value);
            },
            removeItem: (key) => {
                map.delete(key);
            },
            key: (index) => [...map.keys()][index] ?? null,
        };
        const store = createStore(flaky);

        store.write('template', { id: 'first' });
        broken = true;

        expect(() => store.write('comments', [{ id: 'c1' }])).not.toThrow();
        expect(store.read('template')).toEqual({ id: 'first' });
    });

    it('propagates a serialization failure instead of swallowing it as a storage failure', () => {
        // Regression test: JSON.stringify used to run inside the storage
        // guard, so a circular reference or other unserializable value was
        // misdiagnosed as a storage problem and silently swallowed instead of
        // surfacing the actual data-shape bug to the caller.
        const store = createStore(memoryStorage());
        const circular: Record<string, unknown> = {};
        circular.self = circular;

        expect(() => store.write('template', circular)).toThrow();
    });
});
