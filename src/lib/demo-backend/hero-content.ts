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

/**
 * The SDK playground's fixed sample GIF previews the countdown block. It does
 * not read the target date; a real integration supplies a URL backed by a timer
 * image service.
 */
export const HERO_COUNTDOWN_GIF = 'https://play.templatical.com/countdown-sample.gif';

export function heroTargetDate(now = Date.now()): string {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Berlin',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(now);
    const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    const date = new Date(Date.UTC(value('year'), value('month') - 1, value('day') + 12));
    return `${date.toISOString().slice(0, 10)}T18:00`;
}

function feature(n: number, title: string, body: string) {
    return [
        {
            id: `hero-feature-${n}-title`,
            type: 'paragraph',
            content: `<p style="text-align: center"><span style="font-size: 15px; color: #0f172a"><strong>${title}</strong></span></p>`,
            styles: { padding: { top: 0, right: 8, bottom: 6, left: 8 } },
        },
        {
            id: `hero-feature-${n}-body`,
            type: 'paragraph',
            content: `<p style="text-align: center"><span style="font-size: 14px">${body}</span></p>`,
            styles: { padding: { top: 0, right: 8, bottom: 0, left: 8 } },
        },
    ];
}

export const HERO_CONTENT = {
    settings: {
        width: 600,
        backgroundColor: '#ffffff',
        textColor: '#475569',
        linkColor: '#2c85de',
        linkUnderline: true,
        fontFamily: 'Helvetica, Arial, sans-serif',
        preheaderText: 'Early access opens soon. Save your spot before the doors open.',
        // Required by `TemplateSettings` (BCP-47, drives the rendered
        // `<html lang>`) and read unconditionally by `renderToMjml()`. Fixed
        // to English rather than bound to the site's `locale` because the
        // block copy below is hardcoded English regardless of UI language —
        // tagging it `lang="de"` on the German site would mispronounce
        // correct content for screen readers, not fix anything.
        locale: 'en',
        // The empty German version exposes Translate in the Languages menu;
        // HERO_TRANSLATIONS supplies its recorded result.
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
                padding: { top: 32, right: 32, bottom: 20, left: 32 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-eyebrow',
            type: 'paragraph',
            content:
                '<p style="text-align: center"><span style="font-size: 12px; letter-spacing: 2px; color: #2c85de"><strong>EARLY ACCESS</strong></span></p>',
            styles: {
                padding: { top: 0, right: 40, bottom: 4, left: 40 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-headline',
            type: 'title',
            content:
                '<p><span data-merge-tag="{{first_name}}">First Name</span>, meet the new Acme</p>',
            level: 2,
            color: '#0f172a',
            textAlign: 'center',
            styles: {
                padding: { top: 4, right: 40, bottom: 12, left: 40 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-intro',
            type: 'paragraph',
            content:
                '<p style="text-align: center">We rebuilt it around how teams actually plan. Early-access members get in first, and the doors open in:</p>',
            styles: {
                padding: { top: 0, right: 48, bottom: 16, left: 48 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-countdown',
            type: 'countdown',
            targetDate: heroTargetDate(),
            timezone: 'Europe/Berlin',
            showDays: true,
            showHours: true,
            showMinutes: true,
            showSeconds: true,
            separator: ':',
            digitFontSize: 36,
            digitColor: '#0f172a',
            labelColor: '#64748b',
            labelFontSize: 12,
            backgroundColor: '#ffffff',
            labelDays: 'Days',
            labelHours: 'Hours',
            labelMinutes: 'Minutes',
            labelSeconds: 'Seconds',
            expiredMessage: 'Early access is open',
            expiredImageUrl: '',
            hideOnExpiry: false,
            styles: {
                padding: { top: 0, right: 24, bottom: 24, left: 24 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-cta',
            type: 'button',
            text: 'Reserve my spot',
            url: 'https://example.com/early-access',
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            borderRadius: 8,
            fontSize: 15,
            buttonPadding: { top: 14, right: 28, bottom: 14, left: 28 },
            align: 'center',
            styles: {
                padding: { top: 0, right: 20, bottom: 32, left: 20 },
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-features',
            type: 'section',
            columns: '3',
            borderRadius: 12,
            // A pale card inset on the white body: the band supplies the
            // side margins, which block styles have no field for.
            wrapper: {
                backgroundColor: '#ffffff',
                padding: { top: 0, right: 24, bottom: 32, left: 24 },
            },
            children: [
                feature(
                    1,
                    'Shared boards',
                    'Plan together in real time, every change in one place.',
                ),
                feature(
                    2,
                    'Offline mode',
                    'Keep working on the train. Everything syncs when you are back.',
                ),
                feature(3, 'Team calendar', 'Deadlines and time off, side by side.'),
            ],
            styles: {
                padding: { top: 24, right: 12, bottom: 24, left: 12 },
                backgroundColor: '#f8fafc',
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
        'hero-eyebrow/content':
            '<p style="text-align: center"><span style="font-size: 12px; letter-spacing: 2px; color: #2c85de"><strong>FRÜHER ZUGANG</strong></span></p>',
        'hero-headline/content': '<p><x id="1"/>, lernen Sie das neue <x id="2"/> kennen</p>',
        'hero-intro/content':
            '<p style="text-align: center">Wir haben es neu entwickelt, damit Teams ihre Arbeit besser planen können. Mitglieder mit Early Access erhalten zuerst Zugang. Der Start ist in:</p>',
        'hero-countdown/labelDays': 'Tage',
        'hero-countdown/labelHours': 'Stunden',
        'hero-countdown/labelMinutes': 'Minuten',
        'hero-countdown/labelSeconds': 'Sekunden',
        'hero-countdown/expiredMessage': 'Der Early Access ist geöffnet',
        'hero-cta/text': 'Platz sichern',
        'hero-feature-1-title/content':
            '<p style="text-align: center"><span style="font-size: 15px; color: #0f172a"><strong>Gemeinsame Boards</strong></span></p>',
        'hero-feature-1-body/content':
            '<p style="text-align: center"><span style="font-size: 14px">Planen Sie gemeinsam in Echtzeit. Jede Änderung bleibt an einem Ort.</span></p>',
        'hero-feature-2-title/content':
            '<p style="text-align: center"><span style="font-size: 15px; color: #0f172a"><strong>Offline-Modus</strong></span></p>',
        'hero-feature-2-body/content':
            '<p style="text-align: center"><span style="font-size: 14px">Arbeiten Sie auch unterwegs weiter. Alles wird synchronisiert, sobald Sie wieder online sind.</span></p>',
        'hero-feature-3-title/content':
            '<p style="text-align: center"><span style="font-size: 15px; color: #0f172a"><strong>Teamkalender</strong></span></p>',
        'hero-feature-3-body/content':
            '<p style="text-align: center"><span style="font-size: 14px">Fristen und Abwesenheiten stehen nebeneinander.</span></p>',
        'hero-footer/content':
            '<p style="text-align: center"><span style="font-size: 12px; color: #94a3b8"><x id="1"/> Inc. · 1 Market St, San Francisco · <a href="__x2__">Abmelden</a></span></p>',
        'settings/preheaderText':
            'Der Early Access beginnt bald. Sichern Sie sich Ihren Platz vor dem Start.',
    },
};
