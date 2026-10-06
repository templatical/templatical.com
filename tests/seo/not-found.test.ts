import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { routes } from '@/router';

describe('404 page', () => {
    it('prerenders at /404 and catches unknown client-side paths last', () => {
        const paths = routes.map((route) => route.path);
        expect(paths).toContain('/404');
        expect(paths.at(-1)).toBe('/:pathMatch(.*)*');
    });

    it.each([
        ['en', en.notFound.meta.title, 'Page not found — Templatical'],
        ['de', de.notFound.meta.title, 'Seite nicht gefunden — Templatical'],
    ])('%s has its title', (_locale, actual, expected) => {
        expect(actual).toBe(expected);
    });
});
