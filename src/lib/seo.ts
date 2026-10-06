// Keep this file free of imports: vite.config.ts loads it, and a config is evaluated
// before its own `@` alias exists, so an aliased import here would not resolve.

/** The host search engines should index. `www` 301s here through a Cloudflare rule. */
export const SITE_ORIGIN = 'https://templatical.com';

/** The indexable URL for a route path: apex host, no query or hash, no trailing slash except the root. */
export function canonicalUrl(path: string): string {
    const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, '');
    return `${SITE_ORIGIN}${pathname || '/'}`;
}

export interface RenderedPage {
    route: string;
    html: string;
}

/** Routes that render but are not pages to index: noindex, no canonical, absent from the sitemap. */
const UNLISTED = new Set(['/404']);

/** sitemap.xml for the prerendered routes. */
export function buildSitemap(routes: readonly string[]): string {
    const urls = [...new Set(routes)]
        .filter((route) => !UNLISTED.has(route))
        .sort()
        .map((route) => `  <url><loc>${canonicalUrl(route)}</loc></url>`);
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n');
}

// `&#39;` is not what the prerender writes; it is the other common spelling of an apostrophe.
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" };

/**
 * Text as a browser reads it. The prerender escapes `& < >` in element text but only
 * `& "` in attribute values, so a title and the tags that repeat it differ byte for
 * byte. One pass: `&amp;lt;` is the text `&lt;`, not `<`.
 */
function decodeEntities(text: string): string {
    return text.replace(/&(amp|lt|gt|quot|#39);/g, (_, name: string) => ENTITIES[name]);
}

/**
 * The document head. A title, meta or link tag only counts there: an inline SVG
 * puts a `<title>` in the body.
 */
function headOf(html: string): string {
    return html.split(/<\/head>/i, 1)[0];
}

/**
 * Opening tags of one element. A quoted value may hold ">": the prerender leaves it
 * raw inside attributes.
 */
function openingTags(html: string, name: string): string[] {
    return html.match(new RegExp(`<${name}\\b(?:[^>"]|"[^"]*")*>`, 'gi')) ?? [];
}

function attribute(tag: string, name: string): string | undefined {
    return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
}

/**
 * `content` of each `<meta>` whose `name` or `property` is `key`, decoded. Open Graph
 * reads `property`; Twitter reads `name`.
 */
function metaContents(metas: readonly string[], attr: 'name' | 'property', key: string): string[] {
    return metas
        .filter((tag) => attribute(tag, attr) === key)
        .map((tag) => decodeEntities(attribute(tag, 'content') ?? ''));
}

/** The problem line, unless `values` is exactly `[expected]`. */
function expectOne(
    route: string,
    key: string,
    values: readonly string[],
    expected: string,
): string[] {
    if (values.length === 1 && values[0] === expected) return [];
    return [`${route}: ${key} ${JSON.stringify(values)}, expected ${JSON.stringify([expected])}`];
}

/**
 * What an untranslated message looks like: the dotted key itself. vue-i18n answers a
 * key it cannot find with that key, and the social tags repeat whatever the title is,
 * so a missing or mistyped `meta.title` ships as the page title with every other rule
 * here passing. Real titles and descriptions are sentences; a host name has one dot
 * where a key has two or more. Not global: `.test()` on a `g` regex carries
 * `lastIndex` from one page to the next.
 */
const I18N_KEY = /^[a-z]\w*(\.\w+){2,}$/i;

/** The `@type` of each JSON-LD block; a block that does not parse reads "(invalid JSON)". */
function jsonLdTypes(html: string): string[] {
    const blocks = html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    );
    return [...blocks].map(([, json]) => {
        try {
            return JSON.parse(json)['@type'] as string;
        } catch {
            return '(invalid JSON)';
        }
    });
}

/**
 * What a crawler would find wrong in the prerendered HTML. The build fails on
 * a non-empty list (vite.config.ts → ssgOptions.onFinished): a head that drops
 * page titles still builds and renders, so nothing else here would notice.
 */
export function auditPages(pages: readonly RenderedPage[]): string[] {
    if (pages.length === 0) return ['no pages were prerendered'];
    const problems: string[] = [];
    const firstRouteByTitle = new Map<string, string>();
    for (const { route, html } of pages) {
        const head = headOf(html);
        const titles = [...head.matchAll(/<title>([^<]*)<\/title>/gi)].map(([, title]) =>
            decodeEntities(title),
        );
        if (titles.length !== 1) problems.push(`${route}: ${titles.length} <title> tags`);
        const metas = openingTags(head, 'meta');
        const descriptions = metaContents(metas, 'name', 'description');
        if (descriptions.length !== 1)
            problems.push(`${route}: ${descriptions.length} meta descriptions`);
        for (const title of titles)
            if (I18N_KEY.test(title))
                problems.push(`${route}: <title> "${title}" looks like an untranslated i18n key`);
        for (const description of descriptions)
            if (I18N_KEY.test(description))
                problems.push(
                    `${route}: meta description "${description}" looks like an untranslated i18n key`,
                );
        const canonicals = openingTags(head, 'link')
            .filter((tag) => attribute(tag, 'rel') === 'canonical')
            .map((tag) => attribute(tag, 'href') ?? '');
        const ogUrls = metaContents(metas, 'property', 'og:url');
        const robots = metaContents(metas, 'name', 'robots');

        if (UNLISTED.has(route)) {
            if (robots[0] !== 'noindex') problems.push(`${route}: not marked noindex`);
            if (canonicals.length > 0)
                problems.push(
                    `${route}: canonical ${JSON.stringify(canonicals)} on a noindex page`,
                );
            if (ogUrls.length > 0)
                problems.push(`${route}: og:url ${JSON.stringify(ogUrls)} on a noindex page`);
        } else {
            problems.push(...expectOne(route, 'canonical', canonicals, canonicalUrl(route)));
            problems.push(...expectOne(route, 'og:url', ogUrls, canonicalUrl(route)));
            // A noindex that leaks onto every page would deindex the site with a green build.
            for (const content of robots)
                problems.push(`${route}: robots "${content}" on an indexable page`);
            if (route === '/') {
                const types = jsonLdTypes(html);
                if (!types.includes('SoftwareApplication'))
                    problems.push(
                        `${route}: no SoftwareApplication JSON-LD (found ${JSON.stringify(types)})`,
                    );
            }
        }

        // The social tags repeat the page's own title and description. Skipped when the
        // page has no single one to repeat: the count problem above already says so.
        const title = titles.length === 1 ? titles[0] : undefined;
        const description = descriptions.length === 1 ? descriptions[0] : undefined;
        for (const [key, attr, expected] of [
            ['og:title', 'property', title],
            ['og:description', 'property', description],
            ['twitter:title', 'name', title],
            ['twitter:description', 'name', description],
        ] as const) {
            if (expected !== undefined)
                problems.push(...expectOne(route, key, metaContents(metas, attr, key), expected));
        }

        if (!UNLISTED.has(route) && titles[0] !== undefined) {
            const first = firstRouteByTitle.get(titles[0]);
            if (first !== undefined) problems.push(`${route}: same <title> as ${first}`);
            else firstRouteByTitle.set(titles[0], route);
        }
    }
    return problems;
}

/** schema.org description of the product, emitted on the home page as JSON-LD. */
export const SOFTWARE_APPLICATION = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Templatical',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
        'Embeddable drag-and-drop email editor SDK: JSON templates in, MJML out, framework-agnostic. Source-available under FSL-1.1-MIT, free for commercial embedding, MIT two years after each release.',
    url: `${SITE_ORIGIN}/`,
    license: 'https://github.com/templatical/sdk/blob/main/LICENSE',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    sameAs: [
        'https://github.com/templatical/sdk',
        'https://www.npmjs.com/package/@templatical/editor',
    ],
} as const;
