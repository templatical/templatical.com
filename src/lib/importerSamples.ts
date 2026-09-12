/**
 * Generated. Do not hand-edit — regenerate instead (see below).
 *
 * One real conversion per importer, for the transmuter panel in the /importers
 * hero. Every byte here came out of the published converter: the `source` is a
 * window on that converter's own test fixture in the SDK repo, `target` is a
 * window on the `content` it returned for that fixture, and `report` is the
 * verbatim `report.summary` — so the counts the hero animates are the counts
 * the package actually produced, never a number someone typed.
 *
 * PROVENANCE — this is a dated claim, like every /alternatives/* page.
 *   SDK commit:  b06e8c7c
 *   Converters:  0.36.0 (all eight)
 *   Generated:   2026-09-12
 *
 * The page states that pin once, in `importers.footnote.samples`, reading
 * SAMPLE_CONVERTER_VERSION and SAMPLE_VERIFIED_ON below. Re-verify whenever the
 * SDK's converters or fixtures move; regenerate with the SDK checked out as a
 * sibling and its importer packages built (`pnpm run build` there first).
 *
 * The excerpt window is SEARCHED, not hand-picked: the generator scores every
 * candidate window pair by how many values the two panes actually share, so each
 * sample shows 3 carried values wherever the conversion provides them. Two
 * edits are applied to both panes identically, so a carried value still matches
 * verbatim across them:
 *   - `id` keys are dropped from the target (per-run UUIDs, pure noise here).
 *   - Literals over 26 chars, and any line over 66, are elided with a
 *     visible `…` so nothing is silently misquoted and no line overflows.
 *
 * `carried` holds values present verbatim in BOTH windows AFTER that eliding —
 * that is what the flight animation follows, and why it can never animate a
 * correspondence the conversion did not actually make.
 */

export type ImporterSampleLang = 'html' | 'json';

export interface ImporterSampleReport {
    total: number;
    converted: number;
    approximated: number;
    htmlFallback: number;
    skipped: number;
}

export interface ImporterSample {
    slug: string;
    /** The package that produced `target` from `source`. */
    pkg: string;
    /** Path of the fixture inside the SDK repo, for re-verification. */
    fixture: string;
    lang: ImporterSampleLang;
    source: string;
    target: string;
    /** Values present verbatim in both windows; the flight follows these. */
    carried: string[];
    report: ImporterSampleReport;
    /** First real warning the converter raised, if any. */
    warning: string | null;
}

/** Hard column cap every pane below respects, so no line overflows the panel. */
export const SAMPLE_MAX_COLUMNS = 66;

/** Lines shown per pane. Identical for every sample — the panes must not change
 *  height as the rail advances. */
export const SAMPLE_PANE_LINES = { source: 12, target: 14 };

/** The converter version every sample below was produced by. */
export const SAMPLE_CONVERTER_VERSION = '0.36.0';

/** ISO date the samples were last regenerated and re-verified. */
export const SAMPLE_VERIFIED_ON = '2026-09-12';

export const IMPORTER_SAMPLES: Readonly<Record<string, ImporterSample>> = {
    beefree: {
        slug: 'beefree',
        pkg: '@templatical/import-beefree',
        fixture: 'packages/import-beefree/src/__tests__/fixtures/example-1.json',
        lang: 'json',
        source: '"button": {\n  "style": {\n    "background-color": "#000000",\n    "border-bottom": "0px solid transparent",\n    "border-left": "0px solid transparent",\n    "border-radius": "0px",\n    "border-right": "0px solid transparent",\n    "border-top": "0px solid transparent",\n    "color": "#ffffff",\n    "direction": "ltr",\n    "font-family": "Montserrat, Trebuchet MS, Lucida Grande, Luci…\n    "font-size": "14px",',
        target: '"type": "button",\n"text": "REGISTER NOW",\n"url": "{{guest.landin…ogin_code}}",\n"backgroundColor": "#000000",\n"textColor": "#ffffff",\n"borderRadius": 0,\n"fontSize": 14,\n"buttonPadding": {\n  "top": 5,\n  "right": 20,\n  "bottom": 5,\n  "left": 20\n},\n"align": "center",',
        carried: ['#ffffff', '#000000'],
        report: { total: 7, converted: 7, approximated: 0, htmlFallback: 0, skipped: 0 },
        warning: null,
    },
    unlayer: {
        slug: 'unlayer',
        pkg: '@templatical/import-unlayer',
        fixture: 'packages/import-unlayer/src/__tests__/fixtures/example-1.json',
        lang: 'json',
        source: '"type": "button",\n"values": {\n  "text": "Shop now",\n  "href": {\n    "name": "web",\n    "values": {\n      "href": "https://shop.test"\n    }\n  },\n  "buttonColors": {\n    "color": "#ffffff",\n    "backgroundColor": "#ff5500"',
        target: '"type": "button",\n"text": "Shop now",\n"url": "https://shop.test",\n"backgroundColor": "#ff5500",\n"textColor": "#ffffff",\n"borderRadius": 0,\n"fontSize": 16,\n"buttonPadding": {\n  "top": 12,\n  "right": 24,\n  "bottom": 12,\n  "left": 24\n},\n"align": "center",',
        carried: ['Shop now', 'https://shop.test', '#ffffff'],
        report: { total: 12, converted: 8, approximated: 1, htmlFallback: 2, skipped: 1 },
        warning:
            'Row with 4 columns was flattened to a single column. Unlayer supports arbitrary columns, but Templatical supports up to 3.',
    },
    stripo: {
        slug: 'stripo',
        pkg: '@templatical/import-stripo',
        fixture: 'packages/import-stripo/src/__tests__/fixtures/compiled-content.html',
        lang: 'html',
        source: '<table class="es-wrapper">\n  <tr>\n    <td>\n      <table class="es-content">\n        <tr>\n          <td>\n            <p>Fixture Widget Copy</p>\n            <a class="es-…" hr…"https://example.com/cta">Shop Now…\n          </td>\n        </tr>\n      </table>\n    </td>',
        target: '  "content": "<p>Fixture Widget Copy</p>",\n  "styles": {\n    "padding": {\n      "top": 0,\n      "right": 0,\n      "bottom": 0,\n      "left": 0\n    }\n  }\n},\n{\n  "type": "button",\n  "text": "Shop Now",\n  "url": "https://example.com/cta",',
        carried: ['Fixture Widget Copy', 'Shop Now', 'https://example.com/cta'],
        report: { total: 3, converted: 3, approximated: 0, htmlFallback: 0, skipped: 0 },
        warning: null,
    },
    topol: {
        slug: 'topol',
        pkg: '@templatical/import-topol',
        fixture: 'packages/import-topol/src/__tests__/fixtures/example-1.json',
        lang: 'json',
        source: '"attributes": {\n  "containerWidth": 600,\n  ":color": "#333333",\n  ":font-family": "Arial, sans-serif",\n  ":line-height": "1.5",\n  "a:color": "#0066cc"\n},\n"children": [\n  {\n    "tagName": "mj-container",\n    "attributes": {\n      "background-color": "#ffffff"',
        target: '        "bottom": 24,\n        "left": 24\n      }\n    }\n  }\n],\n"settings": {\n  "width": 600,\n  "backgroundColor": "#ffffff",\n  "textColor": "#333333",\n  "linkUnderline": true,\n  "fontFamily": "Arial",\n  "locale": "en",\n  "linkColor": "#0066cc"',
        carried: ['#333333', '#0066cc', '#ffffff'],
        report: { total: 5, converted: 5, approximated: 0, htmlFallback: 0, skipped: 0 },
        warning:
            'Dropped the document line-height (1.5) — Templatical has no document-level line-height setting.',
    },
    chamaileon: {
        slug: 'chamaileon',
        pkg: '@templatical/import-chamaileon',
        fixture: 'packages/import-chamaileon/src/__tests__/fixtures/example-1.json',
        lang: 'json',
        source: '    "text": "<h1>Hello from Chamaileon</h1>"\n  }\n},\n{\n  "type": "button",\n  "attrs": {\n    "text": "Click me",\n    "href": "https://example.test"\n  },\n  "style": {\n    "backgroundColor": "#00a591",\n    "color": "#ffffff"',
        target: '"type": "button",\n"text": "Click me",\n"url": "https://example.test",\n"backgroundColor": "#00a591",\n"textColor": "#ffffff",\n"borderRadius": 6,\n"fontSize": 15,\n"buttonPadding": {\n  "top": 12,\n  "right": 24,\n  "bottom": 12,\n  "left": 24\n},\n"align": "center",',
        carried: ['Click me', 'https://example.test', '#00a591'],
        report: { total: 3, converted: 3, approximated: 0, htmlFallback: 0, skipped: 0 },
        warning: null,
    },
    'easy-email-pro': {
        slug: 'easy-email-pro',
        pkg: '@templatical/import-easy-email-pro',
        fixture: 'packages/import-easy-email-pro/src/__tests__/fixtures/example-1.json',
        lang: 'json',
        source: '},\n{\n  "type": "standard-button",\n  "data": {\n    "content": "Button"\n  },\n  "attributes": {\n    "background-color": "#C5900C"\n  },\n  "children": [\n    {\n      "text": "Book a table"',
        target: '"type": "button",\n"text": "Book a table",\n"url": "",\n"backgroundColor": "#C5900C",\n"textColor": "#ffffff",\n"borderRadius": 6,\n"fontSize": 15,\n"buttonPadding": {\n  "top": 12,\n  "right": 24,\n  "bottom": 12,\n  "left": 24\n},\n"align": "center",',
        carried: ['Book a table', '#C5900C'],
        report: { total: 5, converted: 4, approximated: 1, htmlFallback: 0, skipped: 0 },
        warning: 'Document subject "Example 1" has no TemplateSettings field and was dropped.',
    },
    html: {
        slug: 'html',
        pkg: '@templatical/import-html',
        fixture: 'packages/import-html/src/__tests__/fixtures/minimal.html',
        lang: 'html',
        source: '        <td align="center" style="padding:0 24px 32px">\n          <a\n            href="https://example.com/verify"\n            target="_blank"\n            style="background-col…ration:none"\n            >Verify email</a\n          >\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>',
        target: '"type": "button",\n"text": "Verify email",\n"url": "https://example.com/verify",\n"backgroundColor": "#4f46e5",\n"textColor": "#ffffff",\n"borderRadius": 6,\n"fontSize": 16,\n"buttonPadding": {\n  "top": 12,\n  "right": 24,\n  "bottom": 12,\n  "left": 24\n},\n"align": "center",',
        carried: ['Verify email', 'https://example.com/verify'],
        report: { total: 3, converted: 3, approximated: 0, htmlFallback: 0, skipped: 0 },
        warning: null,
    },
    mjml: {
        slug: 'mjml',
        pkg: '@templatical/import-mjml',
        fixture: 'packages/import-mjml/src/__tests__/fixtures/newsletter.mjml',
        lang: 'html',
        source: '<mjml lang="en">\n  <mj-head>\n    <mj-preview>This week in email</mj-preview>\n    <mj-attributes>\n      <mj-all font-family="Inter, sans-serif" />\n      <mj-text color="#222222" padding="12px 24px" />\n    </mj-attributes>\n    <mj-style>a { color: #0055ff; text-decoration: none; }</mj-st…\n  </mj-head>\n  <mj-body width="600px" background-color="#f4f4f4">\n    <mj-wrapper background-color="#ffffff" padding="24px">\n      <mj-section padding="0">',
        target: '        "left": 0\n      }\n    }\n  }\n],\n"settings": {\n  "width": 600,\n  "backgroundColor": "#f4f4f4",\n  "textColor": "#222222",\n  "linkUnderline": false,\n  "fontFamily": "Inter",\n  "locale": "en",\n  "linkColor": "#0055ff",\n  "preheaderText": "This week in email"',
        carried: ['This week in email', '#222222', '#0055ff'],
        report: { total: 11, converted: 10, approximated: 0, htmlFallback: 1, skipped: 0 },
        warning: null,
    },
};
