/**
 * Session-scoped store behind the hero's demo backend.
 *
 * TWO CONSTRAINTS THAT ARE EASY TO BREAK AND EXPENSIVE TO DEBUG:
 *
 * 1. SSR. vite-ssg prerenders every route in Node at build time, where
 *    `sessionStorage` does not exist. Nothing here may touch it at module
 *    scope, and every access is guarded — a throw during prerender fails the
 *    build with a stack trace that points nowhere near this file.
 *
 * 2. Blocked storage. Safari private mode and "block all cookies" make the
 *    accessor itself throw on read AND write, not return null. The fallback is
 *    an in-memory object: the demo then loses persistence across a reload and
 *    nothing else. It must never surface as an error state.
 *
 * `sessionStorage`, not `localStorage`, is deliberate: a save has to survive a
 * reload for the persistence demo to be real, but a visitor returning next week
 * should get a pristine hero rather than their own half-edited template as the
 * landing page's centrepiece.
 */

export const NS = 'templatical:hero:';

/**
 * Pinned, rather than assigned by `create()`.
 *
 * Version history and comments are keyed by template id, but the id normally
 * only exists after `create()` resolves — so seeding could never run first.
 * Pinning it is what lets `seed.ts` write against a known id up front.
 */
export const TEMPLATE_ID = 'hero-demo';

export interface StorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(index: number): string | null;
    readonly length: number;
}

export function memoryStorage(): StorageLike {
    const map = new Map<string, string>();
    return {
        get length() {
            return map.size;
        },
        getItem: (key) => map.get(key) ?? null,
        setItem: (key, value) => {
            map.set(key, value);
        },
        removeItem: (key) => {
            map.delete(key);
        },
        key: (index) => [...map.keys()][index] ?? null,
    };
}

/** `sessionStorage` when it exists and actually works, else memory. */
export function resolveStorage(): StorageLike {
    try {
        if (typeof sessionStorage === 'undefined') return memoryStorage();
        // Probe: presence is not permission. A blocked store throws here.
        const probe = `${NS}__probe`;
        sessionStorage.setItem(probe, '1');
        sessionStorage.removeItem(probe);
        return sessionStorage;
    } catch {
        return memoryStorage();
    }
}

export interface DemoStore {
    read<T>(key: string): T | null;
    write<T>(key: string, value: T): T;
    reset(): void;
}

export function createStore(storage: StorageLike = resolveStorage()): DemoStore {
    // Every call is guarded independently, and nothing is remembered between
    // calls. `resolveStorage()` already probes with a real write+remove before
    // handing back `sessionStorage`, so whatever reaches here worked a moment
    // ago — a later throw (a quota rejection, an extension interfering) is
    // transient, and the right response is to fail that one operation, not to
    // give up on the storage for the rest of the session.
    //
    // An earlier version swapped `active` to a fresh, empty in-memory store on
    // the first throw and kept using it thereafter. That silently orphaned
    // everything already written to the real storage: a later `read()` for a
    // key that was still sitting untouched in `sessionStorage` came back
    // `null`, with no error and no way to notice short of losing data.
    // Removing the swap deletes mutable state rather than adding any.
    function safely<T>(fn: (s: StorageLike) => T, fallback: T): T {
        try {
            return fn(storage);
        } catch {
            return fallback;
        }
    }

    return {
        read<T>(key: string): T | null {
            const raw = safely((s) => s.getItem(NS + key), null);
            if (raw === null) return null;
            try {
                return JSON.parse(raw) as T;
            } catch {
                // A corrupt record reads as "nothing stored", so the next write
                // heals it rather than wedging the hero.
                return null;
            }
        },
        write<T>(key: string, value: T): T {
            // Serialized before and outside the guard: a circular reference or
            // a BigInt in caller-supplied data is a bug in the data shape, not
            // a storage failure, and must propagate to the caller instead of
            // being swallowed as if the storage itself were unhealthy.
            const serialized = JSON.stringify(value);
            safely((s) => s.setItem(NS + key, serialized), undefined);
            return value;
        },
        reset(): void {
            const keys = safely((s) => {
                const found: string[] = [];
                for (let i = 0; i < s.length; i += 1) {
                    const k = s.key(i);
                    if (k !== null && k.startsWith(NS)) found.push(k);
                }
                return found;
            }, [] as string[]);
            for (const key of keys) safely((s) => s.removeItem(key), undefined);
        },
    };
}
