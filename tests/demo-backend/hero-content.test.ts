import { describe, expect, it } from 'vitest';
import {
    applyLocaleStrings,
    applyOperations,
    localeCoverage,
    localeStrings,
    resolveLocale,
    SYNTAX_PRESETS,
    type TemplateContent,
} from '@templatical/types';
import { createMockTranslationProvider } from '@templatical/ai-kit/testing';
import {
    HERO_CONTENT,
    HERO_DO_NOT_TRANSLATE,
    HERO_LOCALES,
    HERO_TRANSLATIONS,
} from '@/lib/demo-backend/hero-content';

/*
    The hero's Translate plays recorded German through the kit's mock provider.
    The editor applies a returned field only when it carries exactly the
    placeholders it was sent and no new or changed inline style, and otherwise
    keeps the field's old value and counts it as "kept because their tags
    changed". So a recording that drifts from the seed fails nowhere visible:
    these tests run the same masking the editor runs (`localeStrings`, liquid
    syntax as the hero's merge tags use, the same do-not-translate list) and
    check the recordings against it.
*/

const content = HERO_CONTENT as unknown as TemplateContent;
const options = {
    syntax: SYNTAX_PRESETS.liquid,
    doNotTranslate: [...HERO_DO_NOT_TRANSLATE],
};
const gaps = localeStrings(content, 'de', { ...options, only: 'gaps' });
const german = HERO_TRANSLATIONS.de ?? {};

function placeholders(text: string): string[] {
    return [...text.matchAll(/<x id="\d+"\/>|__x\d+__/g)].map(([token]) => token).sort();
}

function styles(text: string): string[] {
    return [...text.matchAll(/style="([^"]*)"/g)].map(([, value]) => value ?? '');
}

describe('the hero template', () => {
    it('starts with an empty German version beside the English default', () => {
        expect(content.settings.locale).toBe('en');
        expect(content.settings.locales).toEqual(['de']);
        expect(HERO_LOCALES).toEqual(['en', 'de']);
        expect(content.blocks.filter((block) => block.l10n !== undefined)).toEqual([]);
        expect(localeCoverage(content, 'de').missing).toHaveLength(gaps.strings.length);
    });

    it('protects the brand name', () => {
        expect(gaps.tokens['hero-brand/content']).toEqual(['Acme']);
    });
});

describe('the recorded German', () => {
    it('answers exactly the fields Translate sends', () => {
        expect(Object.keys(german).sort()).toEqual(gaps.strings.map(({ id }) => id).sort());
    });

    it.each(gaps.strings.map((entry) => [entry.id, entry] as const))(
        '%s keeps its placeholders and inline styles',
        (id, entry) => {
            const recorded = german[id] ?? '';
            expect(placeholders(recorded)).toEqual(placeholders(entry.source));
            for (const style of styles(recorded)) expect(styles(entry.source)).toContain(style);
        },
    );

    it('is German wherever the English has words to translate', () => {
        const untranslated = gaps.strings
            .filter(({ id, source }) => german[id] === source)
            .map(({ id }) => id);
        // The brand title is the protected name alone.
        expect(untranslated).toEqual(['hero-brand/content']);
    });

    // End to end, as the editor does it: mask, ask the provider, apply.
    it('fills every German gap through the mock provider', async () => {
        const provider = createMockTranslationProvider({ translations: HERO_TRANSLATIONS });
        const result = await provider.translate(
            {
                templateId: 'hero-demo',
                sourceLocale: 'en',
                targetLocale: 'de',
                fields: gaps.strings.map(({ id, format, source }) => ({
                    id,
                    format,
                    text: source,
                })),
            },
            new AbortController().signal,
        );
        const hashes = new Map(gaps.strings.map(({ id, sourceHash }) => [id, sourceHash]));
        const { operations, rejected } = applyLocaleStrings(
            content,
            'de',
            result.fields.map(({ id, text }) => ({ id, text, sourceHash: hashes.get(id) ?? '' })),
            { ...options, tokens: gaps.tokens },
        );
        expect(rejected).toEqual([]);

        const translated = applyOperations(content, operations);
        expect(localeCoverage(translated, 'de')).toMatchObject({ missing: [], stale: [] });

        const projected = resolveLocale(translated, 'de');
        const headline = projected.blocks.find((block) => block.id === 'hero-headline');
        expect(headline).toMatchObject({
            content: '<p>Willkommen, <span data-merge-tag="{{first_name}}">First Name</span></p>',
        });
        expect(projected.settings.preheaderText).toBe(
            'Ihr Arbeitsbereich ist bereit — so geht es weiter.',
        );
    });
});
