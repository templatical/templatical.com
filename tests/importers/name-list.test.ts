import { describe, expect, it } from 'vitest';
import { createI18n } from 'vue-i18n';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { IMPORTERS, importerNameList } from '@/lib/importers';
import pageMetaSource from '../../src/composables/usePageMeta.ts?raw';

describe('importerNameList', () => {
    it.each([
        ['en', ' and '],
        ['de', ' und '],
    ])('lists every importer once, in order, in %s', (locale, conjunction) => {
        const names = IMPORTERS.map(({ name }) => name);
        const list = importerNameList(locale);

        expect(list).toContain(`${names[0]}, ${names[1]}`);
        expect(list.endsWith(`${conjunction}${names.at(-1)}`)).toBe(true);
        for (const name of names) {
            expect(list.split(name)).toHaveLength(2);
        }
        const positions = names.map((name) => list.indexOf(name));
        expect(positions).toEqual([...positions].sort((a, b) => a - b));
    });

    it('falls back to English for an unknown locale', () => {
        expect(importerNameList('unknown-locale')).toBe(importerNameList('en'));
    });
});

describe('importer copy', () => {
    it.each([
        ['en', en],
        ['de', de],
    ])('%s derives the meta description and migration FAQ list', (locale, messages) => {
        const descriptions = [
            messages.importers.meta.description,
            messages.faq.items.migrate.answer,
        ];
        const hostedNames = IMPORTERS.filter(({ group }) => group === 'hosted').map(
            ({ name }) => name,
        );
        const i18n = createI18n({ legacy: false, locale, messages: { en, de } });

        for (const description of descriptions) {
            expect(description).toContain('{importers}');
            for (const name of hostedNames) {
                expect(description).not.toContain(name);
            }
        }

        for (const key of ['importers.meta.description', 'faq.items.migrate.answer']) {
            const rendered = i18n.global.t(key, { importers: importerNameList(locale) });
            expect(rendered).toContain(importerNameList(locale));
            expect(rendered).not.toContain('{importers}');
        }
    });
});

describe('usePageMeta interpolation', () => {
    it('passes description parameters to the translated description shared by all three tags', () => {
        expect(pageMetaSource).toMatch(
            /t\(descriptionKey, options\.descriptionParams\?\.\(\) \?\? \{\}\)/,
        );
        expect(pageMetaSource).toContain("{ name: 'description', content: description }");
        expect(pageMetaSource).toContain("{ property: 'og:description', content: description }");
        expect(pageMetaSource).toContain("{ name: 'twitter:description', content: description }");
    });
});

describe('importerNameList style', () => {
    it('writes English lists without a serial comma, like the rest of the site', () => {
        const names = IMPORTERS.map(({ name }) => name);
        expect(importerNameList('en')).toBe(`${names.slice(0, -1).join(', ')} and ${names.at(-1)}`);
        expect(importerNameList('en')).not.toContain(', and ');
    });
});
