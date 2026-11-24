import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import appSource from '../../src/App.vue?raw';

let getItem: ReturnType<typeof vi.fn>;
let setItem: ReturnType<typeof vi.fn>;
let documentStub: { documentElement: { lang: string }; createElement: () => object };

beforeEach(() => {
    vi.resetModules();
    getItem = vi.fn().mockReturnValue(null);
    setItem = vi.fn();
    documentStub = { documentElement: { lang: 'unset' }, createElement: () => ({}) };
    vi.stubGlobal('window', {});
    vi.stubGlobal('localStorage', { getItem, setItem });
    vi.stubGlobal('navigator', { language: 'en-US' });
    vi.stubGlobal('document', documentStub);
});

afterEach(() => {
    vi.unstubAllGlobals();
});

async function loadLocale() {
    const localeModule = await import('@/composables/useLocale');
    const { i18n } = await import('@/i18n');
    return { ...localeModule, i18n };
}

describe('preferred locale after hydration', () => {
    it('starts in English and applies a stored German preference later', async () => {
        getItem.mockReturnValue('de');

        const { applyPreferredLocale, i18n } = await loadLocale();
        expect(i18n.global.locale.value).toBe('en');
        expect(documentStub.documentElement.lang).toBe('en');
        expect(getItem).not.toHaveBeenCalled();

        applyPreferredLocale();
        expect(getItem).toHaveBeenCalledWith('templatical-locale');
        expect(i18n.global.locale.value).toBe('de');
        expect(documentStub.documentElement.lang).toBe('de');
    });

    it('uses the supported base tag from the browser when storage is empty', async () => {
        vi.stubGlobal('navigator', { language: 'de-AT' });

        const { applyPreferredLocale, i18n } = await loadLocale();
        applyPreferredLocale();

        expect(i18n.global.locale.value).toBe('de');
        expect(documentStub.documentElement.lang).toBe('de');
    });

    it('keeps English for unsupported stored and browser locales', async () => {
        getItem.mockReturnValue('fr');
        vi.stubGlobal('navigator', { language: 'fr-FR' });

        const { applyPreferredLocale, i18n } = await loadLocale();
        applyPreferredLocale();

        expect(i18n.global.locale.value).toBe('en');
        expect(documentStub.documentElement.lang).toBe('en');
    });

    it('falls back to the browser when reading storage throws', async () => {
        getItem.mockImplementation(() => {
            throw new Error('storage blocked');
        });
        vi.stubGlobal('navigator', { language: 'de-DE' });

        const { applyPreferredLocale, i18n } = await loadLocale();
        expect(i18n.global.locale.value).toBe('en');
        expect(() => applyPreferredLocale()).not.toThrow();
        expect(i18n.global.locale.value).toBe('de');
        expect(documentStub.documentElement.lang).toBe('de');
    });

    it('stores only an explicit switch and tolerates a blocked write', async () => {
        getItem.mockReturnValue('de');
        const { applyPreferredLocale, useLocale, i18n } = await loadLocale();

        applyPreferredLocale();
        expect(setItem).not.toHaveBeenCalled();

        const { locale } = useLocale();
        locale.value = 'de';
        expect(setItem).toHaveBeenCalledExactlyOnceWith('templatical-locale', 'de');

        setItem.mockImplementation(() => {
            throw new Error('storage blocked');
        });
        expect(() => {
            locale.value = 'en';
        }).not.toThrow();
        expect(i18n.global.locale.value).toBe('en');
        expect(documentStub.documentElement.lang).toBe('en');
    });

    it('applies the preference once from App onMounted', () => {
        expect(appSource).toMatch(
            /import\s*\{\s*applyPreferredLocale\s*\}\s*from\s*['"]@\/composables\/useLocale['"]/,
        );
        expect(appSource).toMatch(/onMounted\(\(\)\s*=>\s*\{\s*applyPreferredLocale\(\);?\s*\}\)/);
        expect([...appSource.matchAll(/applyPreferredLocale\s*\(/g)]).toHaveLength(1);
    });
});
