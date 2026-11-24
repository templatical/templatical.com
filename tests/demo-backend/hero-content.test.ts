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
    HERO_COUNTDOWN_GIF,
    HERO_DO_NOT_TRANSLATE,
    HERO_LOCALES,
    HERO_TRANSLATIONS,
    heroTargetDate,
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
        expect(gaps.tokens['hero-brand/content']).toEqual(['Cindermill']);
    });

    it('keeps the first title as the headline the recorded AI rewrites', () => {
        const titles: { id: string; content?: string }[] = [];
        const walk = (
            blocks: readonly { id: string; type: string; content?: string; children?: unknown[] }[],
        ) => {
            for (const block of blocks) {
                if (block.type === 'title') titles.push(block);
                if (Array.isArray(block.children)) {
                    for (const column of block.children) {
                        if (Array.isArray(column)) walk(column);
                    }
                }
            }
        };
        walk(content.blocks);
        expect(titles[0]).toMatchObject({
            id: 'ship-headline',
            content: '<p>What shipped in November</p>',
        });
    });

    it('places a white countdown band after the live updates and before the change table', () => {
        const sections = content.blocks.map(({ id }) => id);
        expect(sections.indexOf('ship-countdown-band')).toBe(sections.indexOf('ship-features') + 1);
        expect(sections.indexOf('ship-changes')).toBe(sections.indexOf('ship-countdown-band') + 1);
        const band = findBlock(content.blocks, 'ship-countdown-band') as unknown as {
            styles: { backgroundColor: string };
        };
        const countdown = findBlock(content.blocks, 'ship-countdown') as unknown as {
            type: string;
            timezone: string;
            targetDate: string;
            backgroundColor: string;
            digitColor: string;
            labelColor: string;
        };
        expect(band.styles.backgroundColor).toBe('#ffffff');
        expect(countdown).toMatchObject({
            type: 'countdown',
            timezone: 'Europe/Berlin',
            backgroundColor: '#ffffff',
            digitColor: '#1c1733',
            labelColor: '#4a4562',
        });
        expect(countdown.targetDate).toMatch(/^\d{4}-\d{2}-\d{2}T18:00$/);
        expect(HERO_COUNTDOWN_GIF).toBe('https://play.templatical.com/countdown-sample.gif');
    });

    it('sets 18:00 twelve Berlin calendar days ahead, including a midnight boundary', () => {
        expect(heroTargetDate(new Date('2026-11-24T22:30:00Z'))).toBe('2026-12-06T18:00');
        expect(heroTargetDate(new Date('2026-11-24T23:30:00Z'))).toBe('2026-12-07T18:00');
    });
});

describe('the recorded German', () => {
    it('answers exactly the fields Translate sends', () => {
        expect(Object.keys(german).sort()).toEqual(gaps.strings.map(({ id }) => id).sort());
        for (const field of [
            'ship-countdown-kicker/content',
            'ship-countdown-title/content',
            'ship-countdown/labelDays',
            'ship-countdown/labelHours',
            'ship-countdown/labelMinutes',
            'ship-countdown/labelSeconds',
            'ship-countdown/expiredMessage',
        ]) {
            expect(german).toHaveProperty(field);
        }
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
        // The brand line is the protected name alone.
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
        const greeting = findBlock(projected.blocks, 'ship-greeting');
        expect(greeting).toMatchObject({
            content:
                '<p style="text-align: center; font-size: 16px; color: #1c1733">Hallo <span data-merge-tag="{{first_name}}">First name</span>, das hat sich diesen Monat bei <span data-merge-tag="{{company}}">Company</span> geändert. Drei Aktualisierungen sind live, und ein Termin steht im Kalender.</p>',
        });
        expect(projected.settings.preheaderText).toBe(
            'November bei Cindermill: gemeinsame Zeitpläne, Ruhezeiten und eine Sprechstunde am 14. Januar.',
        );
    });
});

function findBlock(
    blocks: readonly { id: string; children?: unknown[] }[],
    id: string,
): { id: string; content?: string } | undefined {
    for (const block of blocks) {
        if (block.id === id) return block;
        if (!Array.isArray(block.children)) continue;
        for (const column of block.children) {
            if (!Array.isArray(column)) continue;
            const found = findBlock(column, id);
            if (found) return found;
        }
    }
    return undefined;
}

describe('hero template name', () => {
    it('names the seeded newsletter, not the old welcome email', async () => {
        const en = (await import('@/i18n/locales/en')).default;
        const de = (await import('@/i18n/locales/de')).default;
        expect(en.heroEditor.demo.templateName).toBe('November product update');
        expect(de.heroEditor.demo.templateName).toBe('Produkt-Update November');
    });
});
