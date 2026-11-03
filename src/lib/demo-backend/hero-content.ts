/**
 * The hero editor's seed template and its recorded German.
 *
 * They live together, outside HeroEditor.vue, so a test can check every
 * recorded field against what the editor actually sends Translate: the field
 * ids (`<blockId>/<path>`) and the masked text, where a merge-tag chip or a
 * do-not-translate term is a numbered `<x id="n"/>` placeholder. The editor
 * applies a returned field only when it carries exactly the placeholders it
 * was sent, so a recording that drifts from the seed is silently kept out of
 * the translation instead of failing anywhere visible.
 *
 * Edit a seed block's text and its recording in the same change;
 * `tests/demo-backend/hero-content.test.ts` fails until they agree.
 */

const noMargin = { top: 0, right: 0, bottom: 0, left: 0 } as const;
export const HERO_CONTENT = {
    settings: {
        width: 600,
        backgroundColor: '#ffffff',
        textColor: '#475569',
        linkColor: '#2c85de',
        linkUnderline: true,
        fontFamily: 'Helvetica, Arial, sans-serif',
        preheaderText: 'Your workspace is ready — here is what comes next.',
        // Required by `TemplateSettings` (BCP-47, drives the rendered
        // `<html lang>`) and read unconditionally by `renderToMjml()`. Fixed
        // to English rather than bound to the site's `locale` because the
        // block copy below is hardcoded English regardless of UI language —
        // tagging it `lang="de"` on the German site would mispronounce
        // correct content for screen readers, not fix anything.
        locale: 'en',
        // A German version with no German text yet: choosing Deutsch in the
        // Languages menu shows "Translate {count} fields" straight away, and
        // Translate fills it from HERO_TRANSLATIONS below.
        locales: ['de'],
    },
    blocks: [
        {
            id: 'hero-brand',
            type: 'title',
            content: '<p>Acme</p>',
            level: 1,
            color: '#0f172a',
            textAlign: 'center',
            styles: {
                padding: { top: 32, right: 32, bottom: 8, left: 32 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-headline',
            type: 'title',
            content: '<p>Welcome, <span data-merge-tag="{{first_name}}">First Name</span></p>',
            level: 2,
            color: '#0f172a',
            textAlign: 'center',
            styles: {
                padding: { top: 8, right: 40, bottom: 8, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-intro',
            type: 'paragraph',
            content:
                '<p style="text-align: center">Your workspace is ready. Pick up where you left off, or jump in fresh — we set up a <a href="https://example.com/tour">quick tour</a> for you.</p>',
            styles: {
                padding: { top: 0, right: 40, bottom: 24, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-cta',
            type: 'button',
            text: 'Open your dashboard',
            url: 'https://example.com/dashboard',
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            borderRadius: 8,
            fontSize: 15,
            buttonPadding: { top: 14, right: 28, bottom: 14, left: 28 },
            styles: {
                padding: { top: 0, right: 20, bottom: 32, left: 20 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-divider',
            type: 'divider',
            lineStyle: 'solid',
            color: '#e5e7eb',
            thickness: 1,
            width: 'full',
            styles: {
                padding: { top: 0, right: 40, bottom: 0, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-footer',
            type: 'paragraph',
            content:
                '<p style="text-align: center"><span style="font-size: 12px; color: #94a3b8">Acme Inc. · 1 Market St, San Francisco · <a href="{{unsubscribe_url}}">Unsubscribe</a></span></p>',
            styles: {
                padding: { top: 16, right: 24, bottom: 32, left: 24 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
    ],
};

/** The template languages an author can switch to. English is the default. */
export const HERO_LOCALES = ['en', 'de'] as const;

/** Protected from translation: the editor masks it and checks it comes back unchanged. */
export const HERO_DO_NOT_TRANSLATE = ['Acme'] as const;

/**
 * What the recorded translation provider answers, keyed by target language,
 * then field id. Each value is masked exactly as the editor sends it: the
 * protected brand name and the merge-tag chip are `<x id="n"/>`, a merge tag
 * inside an attribute is `__xn__`, and inline `style` values are copied from
 * the English, because Translate refuses a new or changed one.
 */
export const HERO_TRANSLATIONS: Record<string, Record<string, string>> = {
    de: {
        'hero-brand/content': '<p><x id="1"/></p>',
        'hero-headline/content': '<p>Willkommen, <x id="1"/></p>',
        'hero-intro/content':
            '<p style="text-align: center">Ihr Arbeitsbereich ist bereit. Machen Sie dort weiter, wo Sie aufgehört haben, oder fangen Sie neu an — wir haben eine <a href="https://example.com/tour">kurze Tour</a> für Sie vorbereitet.</p>',
        'hero-cta/text': 'Zum Dashboard',
        'hero-footer/content':
            '<p style="text-align: center"><span style="font-size: 12px; color: #94a3b8"><x id="1"/> Inc. · 1 Market St, San Francisco · <a href="__x2__">Abmelden</a></span></p>',
        'settings/preheaderText': 'Ihr Arbeitsbereich ist bereit — so geht es weiter.',
    },
};
