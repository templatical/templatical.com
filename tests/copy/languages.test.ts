import { describe, expect, it } from 'vitest';
import llms from '../../public/llms.txt?raw';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { SOFTWARE_APPLICATION } from '@/lib/seo';

/*
    SDK 0.53.0 shipped language versions (init({ localization }): one shared block tree
    with each language's text, overrides and hidden blocks) and Translate through a
    bring-your-own TranslationProvider (init({ translation })), with the HTTP provider
    and the server helpers in @templatical/ai-kit (MIT). These tests pin how the site
    names them, the two duties the integrator owns (subject lines stay with the host
    that sends the email; every @templatical/* package stays on one version), and that
    no copy claims translation for Templatical Cloud, which does not translate yet.
*/

/** Every string leaf as [path, text]; array items get `[i]`. */
function strings(tree: unknown, path: string): Array<[string, string]> {
    if (typeof tree === 'string') return [[path, tree]];
    if (Array.isArray(tree)) return tree.flatMap((item, i) => strings(item, `${path}[${i}]`));
    if (tree !== null && typeof tree === 'object')
        return Object.entries(tree).flatMap(([key, value]) => strings(value, `${path}.${key}`));
    return [];
}

/** A source file, read through Vite (node:fs is not available here). */
const SOURCES = import.meta.glob('../../src/**/*.vue', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;
const source = (path: string): string => SOURCES[`../../src/${path}`] ?? '';

const TRANSLATE = { en: /\btranslat/i, de: /[ÜüUu]bersetz/ } as const;

/**
 * A sentence that names Cloud and translation together. A question stays joined to
 * the sentence that answers it, because "Prefer managed AI? Templatical Cloud adds
 * …" is how the homepage already introduces Cloud.
 */
function claimsCloudTranslation(text: string, locale: keyof typeof TRANSLATE): boolean {
    return text
        .split(/(?<=[.!;:])\s+/)
        .some((sentence) => /\bCloud\b/.test(sentence) && TRANSLATE[locale].test(sentence));
}

describe.each([
    ['en', en],
    ['de', de],
] as const)('%s copy', (locale, messages) => {
    const versions = locale === 'en' ? /\blanguage versions\b/ : /\bSprachversionen\b/;

    // What a skimming reader, a search snippet and a link preview see.
    it('names language versions in the hero and both page descriptions', () => {
        expect(messages.home.hero.subheadline).toMatch(versions);
        expect(messages.home.meta.description).toMatch(versions);
        expect(messages.features.meta.description).toMatch(versions);
    });

    it('lists language versions with Translate among the SDK features', () => {
        const sdk = messages.home.comparison.columns.templatical.sdk as string[];
        const item = sdk.find((line) => /^(Language versions|Sprachversionen)\b/.test(line));
        expect(item).toBeDefined();
        expect(item).toMatch(locale === 'en' ? /\bTranslate\b/ : /Übersetzen/);
        const diy = messages.home.comparison.columns.diy.tradeOffs as string[];
        expect(diy.some((line) => /^(Language versions|Sprachversionen)\b/.test(line))).toBe(true);
    });

    it('gives Rewrite its Translate preset', () => {
        const rewrite = (messages.home.ai.features as Array<{ name: string; body: string }>)[1];
        expect(rewrite?.body).toMatch(TRANSLATE[locale]);
        expect(messages.features.ai.description).toMatch(TRANSLATE[locale]);
    });

    it('says where translation requests go', () => {
        const answer = messages.faq.items.data.answer;
        const cloudAt = answer.indexOf('Templatical Cloud');
        const initSentences = cloudAt === -1 ? answer : answer.slice(0, cloudAt);
        expect(initSentences).toMatch(
            locale === 'en' ? /sent for translation[^.]*translation service/ : /Übersetzungsdienst/,
        );
    });

    it('answers whether one template can hold several languages', () => {
        const { question, answer } = messages.faq.items.languages;
        expect(question).toMatch(locale === 'en' ? /several languages/ : /mehrere Sprachen/);
        expect(answer).toMatch(/^(Yes|Ja)\. /);
        expect(answer).toContain('TranslationProvider');
        expect(answer).toContain('renderToMjml');
        expect(answer).toMatch(locale === 'en' ? /Subject lines stay/ : /Betreffzeilen bleiben/);
    });

    it('states the duties the integrator owns where the backend is described', () => {
        const backend = (messages.home.languages.backend as string[]).join(' ');
        expect(backend).toMatch(locale === 'en' ? /Subject lines/ : /Betreffzeilen/);
        expect(backend).toContain('@templatical/*');
        expect(JSON.stringify(messages.features.translation.features)).toMatch(
            locale === 'en' ? /Subject lines/ : /Betreffzeilen/,
        );
    });

    // Cloud's own translation isn't built. Any sentence, anywhere in the locale (the
    // Cloud section included, where it exists), that names Cloud and translation in
    // one breath is the claim this guards against.
    it('never claims translation for Templatical Cloud', () => {
        const claims = strings(messages, locale).filter(([, text]) =>
            claimsCloudTranslation(text, locale),
        );
        expect(claims.map(([path]) => path)).toEqual([]);
    });
});

describe('the Cloud translation guard', () => {
    it.each([
        ['en', 'Templatical Cloud translates every language version for you.'],
        ['en', 'Prefer managed translation? Templatical Cloud runs it.'],
        ['de', 'Templatical Cloud übersetzt jede Sprachversion für Sie.'],
        ['de', 'Die Übersetzung übernimmt Templatical Cloud.'],
    ] as const)('catches %s "%s"', (locale, text) => {
        expect(claimsCloudTranslation(text, locale)).toBe(true);
    });

    it.each([
        ['en', 'Translate fills a version through your provider. Templatical Cloud hosts media.'],
        ['en', 'Cloud build adds a managed media browser when you opt in'],
        ['de', '„Übersetzen“ füllt eine Version. Templatical Cloud hostet Medien.'],
    ] as const)('leaves %s "%s" alone', (locale, text) => {
        expect(claimsCloudTranslation(text, locale)).toBe(false);
    });
});

describe('the /features sections', () => {
    const FEATURES = source('pages/Features.vue');

    it('names the language-version contract in both locales', () => {
        for (const messages of [en, de]) {
            const section = JSON.stringify(messages.features.languages);
            for (const name of [
                'localization.locales',
                'renderToMjml(content, { locale })',
                'strings export',
                'localization.untranslated',
                'Beefree, Unlayer',
            ])
                expect(section, name).toContain(name);
        }
    });

    it('names the translation contract and the MIT kit in both locales', () => {
        for (const messages of [en, de]) {
            const section = JSON.stringify(messages.features.translation);
            for (const name of [
                'TranslationProvider',
                'createHttpTranslationProvider',
                'readTranslationRequest',
                'translateFields',
                'runTranslationConformance',
                '@templatical/ai-kit',
                'MIT',
            ])
                expect(section, name).toContain(name);
        }
    });

    it('shows the client and the server half of the translation provider', () => {
        expect(FEATURES).toContain("translation: createHttpTranslationProvider({ url: '/api' })");
        expect(FEATURES).toContain("} from '@templatical/ai-kit/server'");
        expect(FEATURES).toContain('await translateFields({');
        expect(FEATURES).toContain("label: t('features.variants.yourServer')");
    });
});

describe('the homepage section', () => {
    const HOME = source('pages/Home.vue');
    const SECTION = source('components/HomeLanguagesSection.vue');

    it('follows the Agent Skill section, ahead of the comparison', () => {
        const order = [
            '<HeroSection />',
            '<HomeAiSection />',
            '<HomeAiSkillSection />',
            '<HomeLanguagesSection />',
            '<ComparisonSection />',
        ].map((tag) => HOME.indexOf(tag));
        expect(order.every((at) => at > -1)).toBe(true);
        expect([...order].sort((a, b) => a - b)).toEqual(order);
    });

    it('is labelled new, without a licence', () => {
        expect(en.home.languages.eyebrow).toBe('New · Language versions');
        expect(de.home.languages.eyebrow).toBe('Neu · Sprachversionen');
    });

    it('links the localization guide and the /features section', () => {
        expect(SECTION).toContain("localizedUrl('localizedTemplatesDocs', locale)");
        expect(SECTION).toContain("featureSectionId('languages')");
        expect(SECTION).toContain('createHttpTranslationProvider');
        expect(SECTION).toContain('localization: {');
    });
});

describe('the hero editor', () => {
    const HERO_EDITOR = source('components/HeroEditor.vue');

    it('turns on language versions with the recorded Translate', () => {
        expect(HERO_EDITOR).toMatch(/locales: \[\.\.\.HERO_LOCALES\]/);
        expect(HERO_EDITOR).toMatch(/doNotTranslate: \[\.\.\.HERO_DO_NOT_TRANSLATE\]/);
        expect(HERO_EDITOR).toMatch(
            /translation: createMockTranslationProvider\(\{\s*translations: HERO_TRANSLATIONS,/,
        );
    });

    // The mock comes from the same lazy import as the AI's, so the kit stays out of
    // the home page's first bundle.
    it('takes the mock from the lazily imported kit', () => {
        const lazy = HERO_EDITOR.slice(
            HERO_EDITOR.indexOf('const ['),
            HERO_EDITOR.indexOf("import('@templatical/ai-kit/testing')"),
        );
        expect(lazy).toContain('createMockTranslationProvider');
    });

    it('says in the legend that translations are recorded', () => {
        expect(en.heroEditor.demo.description).toMatch(/recorded AI replies and translations/);
        expect(de.heroEditor.demo.description).toMatch(
            /aufgezeichnete KI-Antworten und Übersetzungen/,
        );
    });
});

describe('the comparison pages', () => {
    // Each vendor's row is sourced from pages checked on 3 November 2026; the rest of
    // each page keeps its own, earlier verification date.
    const PAGES = {
        beefree: ['AlternativeBeefree', ['beefreeMultiLanguageDocs', 'beefreeDeeplDocs']],
        unlayer: ['AlternativeUnlayer', ['unlayerMultiLanguageDocs', 'unlayerMultiLanguageHelp']],
        stripo: [
            'AlternativeStripo',
            ['stripoPluginLocalization', 'stripoPluginAi', 'stripoTranslateHelp'],
        ],
        topol: [
            'AlternativeTopol',
            ['topolMultilingualDocs', 'topolTranslationDocs', 'topolPricing'],
        ],
        chamaileon: ['AlternativeChamaileon', ['chamaileonEditorDocs']],
        easyEmailPro: ['AlternativeEasyEmailPro', ['easyEmailProTranslateDocs']],
        grapesjs: ['AlternativeGrapesjs', ['grapesjsI18nDocs']],
    } as const;

    it.each(Object.entries(PAGES))('%s has a sourced, dated languages row', (key, [page, urls]) => {
        const component = source(`pages/${page}.vue`);
        expect(component).toMatch(/const ROW_KEYS = \[[^\]]*'languages',/);
        for (const url of urls) expect(component, url).toContain(`href: URLS.${url} }`);

        for (const [messages, date] of [
            [en, 'checked on 3 November 2026'],
            [de, 'am 3. November 2026'],
        ] as const) {
            const vendor = (messages.alternatives as Record<string, any>)[key];
            const row = vendor.table.rows.languages;
            expect(row.label.length).toBeGreaterThan(0);
            expect(row.them.length).toBeGreaterThan(0);
            expect(row.us).toBe(
                (messages.alternatives as Record<string, any>).topol.table.rows.languages.us,
            );
            expect(vendor.footnote.verified).toContain(date);
        }
    });
});

describe('agent surfaces', () => {
    it('llms.txt links the localization and translation docs with their contract names', () => {
        expect(llms).toContain('(https://docs.templatical.com/guide/localized-templates)');
        expect(llms).toContain('(https://docs.templatical.com/backend/translation)');
        for (const name of [
            '`TranslationProvider`',
            '`createHttpTranslationProvider`',
            '`translateFields`',
            '`runTranslationConformance`',
            '`renderToMjml(content, { locale })`',
            '`template-tools strings export`',
        ])
            expect(llms, name).toContain(name);
        expect(llms.split('\n').find((line) => line.startsWith('> '))).toMatch(/language versions/);
    });

    it('names language versions in the JSON-LD description', () => {
        expect(SOFTWARE_APPLICATION.description).toMatch(/\blanguage versions\b/);
    });
});
