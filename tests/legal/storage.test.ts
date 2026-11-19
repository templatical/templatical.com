import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { BROWSER_STORAGE, displayStorageKey } from '@/lib/legal';

/*
    The privacy notice lists every entry the site keeps in browser storage. These tests
    tie that list to the code: a renamed key, or a new file that starts storing
    something, fails here instead of leaving the notice quietly wrong.
*/

const SOURCES = import.meta.glob(['../../src/**/*.vue', '../../src/**/*.ts'], {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

/** Source without comments, so a comment or a sample snippet's comment never counts. */
function code(text: string): string {
    return text
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

/*
    The notice says the site sets no cookies and lists what it keeps in storage. Cookies and
    IndexedDB are storage too, and VueUse's useDark writes its own `vueuse-color-scheme` key
    (the `\b` keeps useDark from matching our own useDarkMode). A file that starts using any
    of these fails the "lists every file" test below until the notice says otherwise.
*/
const STORAGE_API =
    /\b(localStorage|sessionStorage|useColorMode|useStorage|useLocalStorage|useSessionStorage|document\.cookie|cookieStore|useCookies|indexedDB|useIDBKeyval|useDark)\b/;

/** legal.ts names the two storage areas as values: it is the list, not a user. */
const LIST_FILE = '../../src/lib/legal.ts';

describe('browser storage', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('keeps each listed key in the file that writes it', () => {
        for (const entry of BROWSER_STORAGE) {
            const source = SOURCES[`../../src/${entry.source}`];
            expect(source, entry.source).toBeDefined();
            expect(code(source), entry.key).toContain(`'${entry.key}'`);
        }
    });

    it('lists every file that touches browser storage, and no other', () => {
        const users = Object.entries(SOURCES)
            .filter(([file, text]) => file !== LIST_FILE && STORAGE_API.test(code(text)))
            .map(([file]) => file.replace('../../src/', ''))
            .sort();
        expect(users).toEqual([...new Set(BROWSER_STORAGE.map((entry) => entry.source))].sort());
    });

    /*
        VueUse writes its default to storage on first use unless told not to, which put
        `auto` into localStorage on the first visit. A source-text check cannot tell that
        apart from an option that does nothing, so these run the composable against a
        stubbed browser. VueUse reads window and document when it loads, so the stubs go in
        before the dynamic import. Node keeps @vueuse/core cached across vi.resetModules(),
        so it holds on to the window it saw first: every test therefore reuses one stable
        window and storage, emptied and seeded here, instead of building a fresh pair.
    */
    const entries = new Map<string, string>();
    const fakeStorage = {
        getItem: (key: string) => entries.get(key) ?? null,
        setItem: (key: string, value: string) => void entries.set(key, value),
        removeItem: (key: string) => void entries.delete(key),
    };
    const listeners = { addEventListener() {}, removeEventListener() {} };
    const fakeDocument = { querySelector: () => null };
    const fakeWindow = {
        ...listeners,
        document: fakeDocument,
        localStorage: fakeStorage,
        dispatchEvent: () => true,
        matchMedia: () => ({ matches: false, ...listeners }),
    };

    /** A fresh browser holding only `seed`; the composable's own module loads anew with it. */
    function stubBrowser(seed: Record<string, string> = {}) {
        entries.clear();
        for (const [key, value] of Object.entries(seed)) entries.set(key, value);
        vi.resetModules();
        vi.stubGlobal('Storage', class FakeStorage {});
        vi.stubGlobal('document', fakeDocument);
        vi.stubGlobal('window', fakeWindow);
    }

    it('stores the theme only once the visitor picks one', async () => {
        stubBrowser();

        const { useDarkMode } = await import('@/composables/useDarkMode');
        const { mode, setMode } = useDarkMode();

        expect(entries.has('templatical-theme')).toBe(false);
        expect(mode.value).toBe('auto');

        setMode('dark');
        await nextTick();
        expect(entries.get('templatical-theme')).toBe('dark');
        expect(mode.value).toBe('dark');

        // A return visit reads the choice back: a fresh module load against the same storage.
        vi.resetModules();
        const returning = await import('@/composables/useDarkMode');
        expect(returning.useDarkMode().mode.value).toBe('dark');
    });

    it('removes an `auto` that the earlier default left in storage', async () => {
        // Visitors from before the fix carry `auto` in localStorage: the notice says the
        // theme is stored only once one is chosen, so a load treats it as no key at all.
        stubBrowser({ 'templatical-theme': 'auto' });

        const { useDarkMode } = await import('@/composables/useDarkMode');
        await nextTick();

        expect(entries.has('templatical-theme')).toBe(false);
        expect(useDarkMode().mode.value).toBe('auto');
    });

    it('removes the key again when the visitor chooses auto', async () => {
        stubBrowser();

        const { useDarkMode } = await import('@/composables/useDarkMode');
        const { mode, setMode } = useDarkMode();

        setMode('dark');
        await nextTick();
        expect(entries.get('templatical-theme')).toBe('dark');

        setMode('auto');
        await nextTick();
        expect(entries.has('templatical-theme')).toBe(false);
        expect(mode.value).toBe('auto');

        // Only light and dark are ever stored.
        setMode('light');
        await nextTick();
        expect(entries.get('templatical-theme')).toBe('light');
    });

    it('marks a namespace as a prefix when it renders the key', () => {
        expect(displayStorageKey('templatical:hero:')).toBe('templatical:hero:…');
        expect(displayStorageKey('templatical-theme')).toBe('templatical-theme');
    });
});
