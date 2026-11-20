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
 *
 * Cindermill is a fictional work-planning product. The name is protected from
 * translation the same way the previous brand was. The first title is
 * `ship-headline`: the AI mock's "headline" / "title" turn rewrites whichever
 * title comes first.
 */

type Padding = { top: number; right: number; bottom: number; left: number };

const INK = '#1c1733';
const PAPER = '#f7f4ee';
const WHITE = '#ffffff';
const WASH = '#eef1f8';
const CREAM = '#f6f3ec';
const SOFT = '#d9d3c5';
const MUTED = '#4a4562';
const FOOTER_BG = '#f3efe6';
const FOOTER_TEXT = '#5c5670';
const CORAL = '#c2412d';
const TABLE_HEAD = '#e4e0f2';
const TABLE_LINE = '#d9d5e8';
const UPGRADE = '#f8e7e0';
const LINK = '#9a3412';

const pad = (top: number, right: number, bottom: number, left: number): Padding => ({
    top,
    right,
    bottom,
    left,
});

const box = (padding: Padding, backgroundColor?: string) =>
    backgroundColor ? { padding, backgroundColor } : { padding };

const CENTER_INK = `text-align: center; font-size: 16px; color: ${INK}`;
const CENTER_MUTED = `text-align: center; font-size: 15px; color: ${MUTED}`;
const CENTER_SOFT = `text-align: center; font-size: 16px; color: ${SOFT}`;
const LEFT_INK = `text-align: left; font-size: 16px; color: ${INK}`;
const KICKER = `font-size: 14px; color: ${SOFT}`;
const FOOTER_SPAN = `font-size: 14px; color: ${FOOTER_TEXT}`;
const BRAND_SPAN = `font-size: 18px; color: ${CREAM}`;

const html = (style: string, text: string) => `<p style="${style}">${text}</p>`;

/** Shown only to recipients on the Free plan. The editor config lists the same condition. */
export const HERO_FREE_PLAN_CONDITION = {
    label: 'Free plan',
    before: "{% if plan == 'free' %}",
    after: '{% endif %}',
    description: 'Shown only to people on the Free plan',
};

const zero = pad(0, 0, 0, 0);

export const HERO_CONTENT = {
    settings: {
        width: 600,
        backgroundColor: PAPER,
        textColor: INK,
        linkColor: LINK,
        linkUnderline: true,
        fontFamily: 'Helvetica, Arial, sans-serif',
        preheaderText:
            'November at Cindermill: shared timelines, quiet hours, and office hours on 14 January.',
        // Required by `TemplateSettings` and read unconditionally by
        // `renderToMjml()`. Fixed to English: the copy below is English, and
        // German exists only as the Translate recording.
        locale: 'en',
        // Choosing Deutsch shows "Translate {count} fields" immediately.
        // Translate fills the gaps from HERO_TRANSLATIONS.
        locales: ['de'],
    },
    blocks: [
        {
            id: 'ship-header',
            type: 'section',
            columns: '1',
            styles: box(pad(32, 32, 28, 32), INK),
            children: [
                [
                    {
                        id: 'hero-brand',
                        type: 'paragraph',
                        content: `<p style="text-align: center"><span style="${BRAND_SPAN}">Cindermill</span></p>`,
                        styles: box(pad(0, 0, 6, 0), INK),
                    },
                    {
                        id: 'ship-kicker',
                        type: 'paragraph',
                        content: `<p style="text-align: center"><span style="${KICKER}">November notes</span></p>`,
                        styles: box(zero, INK),
                    },
                ],
            ],
        },
        {
            id: 'ship-hero',
            type: 'section',
            columns: '1',
            styles: box(zero, WHITE),
            children: [
                [
                    {
                        id: 'ship-headline',
                        type: 'title',
                        content: '<p>What shipped in November</p>',
                        level: 1,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(36, 40, 8, 40), WHITE),
                    },
                    {
                        id: 'ship-greeting',
                        type: 'paragraph',
                        content: html(
                            CENTER_INK,
                            'Hi <span data-merge-tag="{{first_name}}">First name</span>, here is what changed for <span data-merge-tag="{{company}}">Company</span> this month. Three updates are live, and one session is on the calendar.',
                        ),
                        styles: box(pad(4, 48, 8, 48), WHITE),
                    },
                    {
                        id: 'hero-cta',
                        type: 'button',
                        text: 'Open your workspace',
                        url: 'https://example.com/workspace',
                        backgroundColor: INK,
                        textColor: WHITE,
                        borderRadius: 8,
                        fontSize: 16,
                        align: 'center',
                        buttonPadding: pad(14, 28, 14, 28),
                        styles: box(pad(8, 40, 28, 40), WHITE),
                    },
                    {
                        id: 'ship-hero-image',
                        type: 'image',
                        src: '/demo/hero-banner.png',
                        alt: 'Geometric banner with an indigo ring, a coral circle, and a paper card of timeline bars',
                        width: 600,
                        naturalWidth: 1200,
                        naturalHeight: 480,
                        align: 'center',
                        fluidOnMobile: true,
                        styles: box(zero, INK),
                    },
                ],
            ],
        },
        {
            id: 'ship-gap-hero',
            type: 'spacer',
            height: 20,
            styles: box(zero),
        },
        {
            id: 'ship-features-intro',
            type: 'section',
            columns: '1',
            styles: box(pad(32, 40, 4, 40), WASH),
            children: [
                [
                    {
                        id: 'ship-title-updates',
                        type: 'title',
                        content: '<p>Three updates</p>',
                        level: 2,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(0, 0, 8, 0), WASH),
                    },
                    {
                        id: 'ship-copy-updates',
                        type: 'paragraph',
                        content: html(CENTER_INK, 'All three are on for every workspace.'),
                        styles: box(pad(0, 12, 8, 12), WASH),
                    },
                ],
            ],
        },
        {
            id: 'ship-features',
            type: 'section',
            columns: '3',
            styles: box(pad(8, 12, 32, 12), WASH),
            children: [
                [
                    {
                        id: 'ship-icon-timeline',
                        type: 'image',
                        src: '/demo/icon-timeline.png',
                        alt: 'A vertical timeline with a coral node and two indigo nodes',
                        width: 64,
                        naturalWidth: 128,
                        naturalHeight: 128,
                        align: 'center',
                        fluidOnMobile: false,
                        styles: box(pad(8, 0, 8, 0), WASH),
                    },
                    {
                        id: 'ship-title-timeline',
                        type: 'title',
                        content: '<p>One timeline</p>',
                        level: 3,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(4, 6, 4, 6), WASH),
                    },
                    {
                        id: 'ship-copy-timeline',
                        type: 'paragraph',
                        content: html(
                            CENTER_MUTED,
                            'Plans from every team sit on one line, so a slipped date shows up before the meeting.',
                        ),
                        styles: box(pad(0, 6, 8, 6), WASH),
                    },
                ],
                [
                    {
                        id: 'ship-icon-quiet',
                        type: 'image',
                        src: '/demo/icon-quiet.png',
                        alt: 'A circle containing a pause mark in coral and indigo',
                        width: 64,
                        naturalWidth: 128,
                        naturalHeight: 128,
                        align: 'center',
                        fluidOnMobile: false,
                        styles: box(pad(8, 0, 8, 0), WASH),
                    },
                    {
                        id: 'ship-title-quiet',
                        type: 'title',
                        content: '<p>Quiet hours</p>',
                        level: 3,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(4, 6, 4, 6), WASH),
                    },
                    {
                        id: 'ship-copy-quiet',
                        type: 'paragraph',
                        content: html(
                            CENTER_MUTED,
                            'Notifications hold outside the hours you set. Mentions arrive when you are back.',
                        ),
                        styles: box(pad(0, 6, 8, 6), WASH),
                    },
                ],
                [
                    {
                        id: 'ship-icon-rounds',
                        type: 'image',
                        src: '/demo/icon-rounds.png',
                        alt: 'Three dots on a ring, the top one coral',
                        width: 64,
                        naturalWidth: 128,
                        naturalHeight: 128,
                        align: 'center',
                        fluidOnMobile: false,
                        styles: box(pad(8, 0, 8, 0), WASH),
                    },
                    {
                        id: 'ship-title-rounds',
                        type: 'title',
                        content: '<p>Review rounds</p>',
                        level: 3,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(4, 6, 4, 6), WASH),
                    },
                    {
                        id: 'ship-copy-rounds',
                        type: 'paragraph',
                        content: html(
                            CENTER_MUTED,
                            'Comments sit in one round. The round closes when every reviewer has answered.',
                        ),
                        styles: box(pad(0, 6, 8, 6), WASH),
                    },
                ],
            ],
        },
        {
            id: 'ship-changes',
            type: 'section',
            columns: '1',
            styles: box(pad(32, 40, 28, 40), WHITE),
            children: [
                [
                    {
                        id: 'ship-title-changes',
                        type: 'title',
                        content: '<p>What changed</p>',
                        level: 2,
                        color: INK,
                        textAlign: 'left',
                        styles: box(pad(0, 0, 8, 0), WHITE),
                    },
                    {
                        id: 'ship-copy-changes',
                        type: 'paragraph',
                        content: html(LEFT_INK, 'The short version, for anyone with a minute.'),
                        styles: box(pad(0, 0, 12, 0), WHITE),
                    },
                    {
                        id: 'ship-changes-table',
                        type: 'table',
                        hasHeaderRow: true,
                        headerBackgroundColor: TABLE_HEAD,
                        borderColor: TABLE_LINE,
                        borderWidth: 1,
                        cellPadding: 12,
                        fontSize: 15,
                        color: INK,
                        textAlign: 'left',
                        styles: box(pad(4, 0, 4, 0), WHITE),
                        rows: [
                            {
                                id: 'row-head',
                                cells: [
                                    { id: 'cell-head-area', content: 'Area' },
                                    { id: 'cell-head-change', content: 'Change' },
                                ],
                            },
                            {
                                id: 'row-timelines',
                                cells: [
                                    { id: 'cell-timelines-area', content: 'Timelines' },
                                    {
                                        id: 'cell-timelines-change',
                                        content: 'A second team can join an existing plan',
                                    },
                                ],
                            },
                            {
                                id: 'row-notifications',
                                cells: [
                                    { id: 'cell-notifications-area', content: 'Notifications' },
                                    {
                                        id: 'cell-notifications-change',
                                        content: 'Quiet hours now follow each person',
                                    },
                                ],
                            },
                            {
                                id: 'row-reviews',
                                cells: [
                                    { id: 'cell-reviews-area', content: 'Reviews' },
                                    {
                                        id: 'cell-reviews-change',
                                        content: 'A round closes after the last answer',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            ],
        },
        {
            id: 'ship-office-hours',
            type: 'section',
            columns: '1',
            styles: box(pad(32, 40, 32, 40), INK),
            children: [
                [
                    {
                        id: 'ship-title-hours',
                        type: 'title',
                        content: '<p>Office hours, live</p>',
                        level: 2,
                        color: CREAM,
                        textAlign: 'center',
                        styles: box(pad(0, 0, 8, 0), INK),
                    },
                    {
                        id: 'ship-copy-hours',
                        type: 'paragraph',
                        content: html(
                            CENTER_SOFT,
                            '14 January 2027, 16:00 Lisbon time. Bring one question about the timeline view. The second half is open.',
                        ),
                        styles: box(pad(0, 8, 0, 8), INK),
                    },
                ],
            ],
        },
        {
            id: 'ship-upgrade',
            type: 'section',
            columns: '1',
            displayCondition: { ...HERO_FREE_PLAN_CONDITION },
            border: {
                top: { width: 4, style: 'solid', color: CORAL },
                right: { width: 0, style: 'solid', color: CORAL },
                bottom: { width: 0, style: 'solid', color: CORAL },
                left: { width: 0, style: 'solid', color: CORAL },
            },
            styles: box(pad(28, 40, 32, 40), UPGRADE),
            children: [
                [
                    {
                        id: 'ship-title-upgrade',
                        type: 'title',
                        content: '<p>You are on the Free plan</p>',
                        level: 2,
                        color: INK,
                        textAlign: 'center',
                        styles: box(pad(0, 0, 8, 0), UPGRADE),
                    },
                    {
                        id: 'ship-copy-upgrade',
                        type: 'paragraph',
                        content: html(
                            CENTER_INK,
                            'Shared timelines are part of Pro. This workspace can use them until the end of the month.',
                        ),
                        styles: box(pad(0, 8, 8, 8), UPGRADE),
                    },
                    {
                        id: 'ship-upgrade-cta',
                        type: 'button',
                        text: 'Compare plans',
                        url: 'https://example.com/plans',
                        backgroundColor: INK,
                        textColor: WHITE,
                        borderRadius: 8,
                        fontSize: 16,
                        align: 'center',
                        buttonPadding: pad(14, 28, 14, 28),
                        styles: box(pad(8, 0, 0, 0), UPGRADE),
                    },
                ],
            ],
        },
        {
            id: 'ship-gap-footer',
            type: 'spacer',
            height: 20,
            styles: box(zero),
        },
        {
            id: 'ship-footer',
            type: 'section',
            columns: '1',
            styles: box(pad(8, 32, 28, 32), FOOTER_BG),
            children: [
                [
                    {
                        id: 'ship-footer-copy',
                        type: 'paragraph',
                        content: `<p style="text-align: center"><span style="${FOOTER_SPAN}">Cindermill · 18 Lantern Yard, Lisbon · <a href="{{unsubscribe_url}}">Unsubscribe</a></span></p>`,
                        styles: box(pad(16, 0, 0, 0), FOOTER_BG),
                    },
                ],
            ],
        },
    ],
};

/** The template languages an author can switch to. English is the default. */
export const HERO_LOCALES = ['en', 'de'] as const;

/** Protected from translation: the editor masks it and checks it comes back unchanged. */
export const HERO_DO_NOT_TRANSLATE = ['Cindermill'] as const;

/**
 * What the recorded translation provider answers, keyed by target language,
 * then field id. Each value is masked exactly as the editor sends it: the
 * protected brand name and a merge-tag chip are `<x id="n"/>`, a merge tag
 * inside an attribute is `__xn__`, and inline `style` values are copied from
 * the English, because Translate refuses a new or changed one.
 */
export const HERO_TRANSLATIONS: Record<string, Record<string, string>> = {
    de: {
        'hero-brand/content': `<p style="text-align: center"><span style="${BRAND_SPAN}"><x id="1"/></span></p>`,
        'ship-kicker/content': `<p style="text-align: center"><span style="${KICKER}">Notizen im November</span></p>`,
        'ship-headline/content': '<p>Was im November fertig wurde</p>',
        'ship-greeting/content': html(
            CENTER_INK,
            'Hallo <x id="1"/>, das hat sich diesen Monat bei <x id="2"/> geändert. Drei Aktualisierungen sind live, und ein Termin steht im Kalender.',
        ),
        'hero-cta/text': 'Arbeitsbereich öffnen',
        'ship-hero-image/alt':
            'Geometrisches Banner mit einem indigofarbenen Ring, einem korallenroten Kreis und einer Papierkarte mit Zeitplanbalken',
        'ship-title-updates/content': '<p>Drei Aktualisierungen</p>',
        'ship-copy-updates/content': html(
            CENTER_INK,
            'Alle drei sind für jeden Arbeitsbereich aktiv.',
        ),
        'ship-icon-timeline/alt':
            'Eine senkrechte Zeitleiste mit einem korallenroten Punkt und zwei indigofarbenen Punkten',
        'ship-title-timeline/content': '<p>Ein Zeitplan</p>',
        'ship-copy-timeline/content': html(
            CENTER_MUTED,
            'Die Pläne aller Teams liegen auf einer Linie, damit ein verrutschter Termin vor der Besprechung auffällt.',
        ),
        'ship-icon-quiet/alt': 'Ein Kreis mit einem Pause-Zeichen in Koralle und Indigo',
        'ship-title-quiet/content': '<p>Ruhezeiten</p>',
        'ship-copy-quiet/content': html(
            CENTER_MUTED,
            'Benachrichtigungen warten außerhalb der Stunden, die Sie festlegen. Erwähnungen kommen an, wenn Sie zurück sind.',
        ),
        'ship-icon-rounds/alt': 'Drei Punkte auf einem Ring, der obere korallenrot',
        'ship-title-rounds/content': '<p>Prüfrunden</p>',
        'ship-copy-rounds/content': html(
            CENTER_MUTED,
            'Kommentare werden in einer Feedbackrunde gesammelt. Sie endet, sobald alle Beteiligten geantwortet haben.',
        ),
        'ship-title-changes/content': '<p>Was sich geändert hat</p>',
        'ship-copy-changes/content': html(
            LEFT_INK,
            'Die Kurzfassung für alle, die eine Minute Zeit haben.',
        ),
        'ship-changes-table/rows.row-head.cells.cell-head-area.content': 'Bereich',
        'ship-changes-table/rows.row-head.cells.cell-head-change.content': 'Änderung',
        'ship-changes-table/rows.row-timelines.cells.cell-timelines-area.content': 'Zeitpläne',
        'ship-changes-table/rows.row-timelines.cells.cell-timelines-change.content':
            'Ein zweites Team kann einem bestehenden Plan beitreten',
        'ship-changes-table/rows.row-notifications.cells.cell-notifications-area.content':
            'Benachrichtigungen',
        'ship-changes-table/rows.row-notifications.cells.cell-notifications-change.content':
            'Ruhezeiten folgen jetzt jeder Person',
        'ship-changes-table/rows.row-reviews.cells.cell-reviews-area.content': 'Prüfungen',
        'ship-changes-table/rows.row-reviews.cells.cell-reviews-change.content':
            'Eine Runde schließt nach der letzten Antwort',
        'ship-title-hours/content': '<p>Live-Sprechstunde</p>',
        'ship-copy-hours/content': html(
            CENTER_SOFT,
            '14. Januar 2027, 16:00 Uhr Lissabonner Zeit. Bringen Sie eine Frage zur Zeitplanansicht mit. Die zweite Hälfte ist offen.',
        ),
        'ship-title-upgrade/content': '<p>Sie sind im kostenlosen Tarif</p>',
        'ship-copy-upgrade/content': html(
            CENTER_INK,
            'Gemeinsame Zeitpläne gehören zu Pro. Dieser Arbeitsbereich kann sie bis zum Monatsende nutzen.',
        ),
        'ship-upgrade-cta/text': 'Tarife vergleichen',
        'ship-footer-copy/content': `<p style="text-align: center"><span style="${FOOTER_SPAN}"><x id="1"/> · 18 Lantern Yard, Lisbon · <a href="__x2__">Abmelden</a></span></p>`,
        'settings/preheaderText':
            'November bei <x id="1"/>: gemeinsame Zeitpläne, Ruhezeiten und eine Sprechstunde am 14. Januar.',
    },
};
