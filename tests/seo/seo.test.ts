import { describe, expect, it } from 'vitest';
import { auditPages, buildSitemap, canonicalUrl, SOFTWARE_APPLICATION } from '@/lib/seo';

const page = (route: string, head: string, body = '') => ({
    route,
    html: `<!doctype html><html><head>${head}</head><body>${body}</body></html>`,
});

/** Every tag a valid page head carries, by name. */
const tags = (title: string, path: string) => ({
    title: `<title>${title}</title>`,
    description: '<meta name="description" content="d">',
    canonical: `<link rel="canonical" href="${canonicalUrl(path)}">`,
    ogUrl: `<meta property="og:url" content="${canonicalUrl(path)}">`,
    ogTitle: `<meta property="og:title" content="${title}">`,
    ogDescription: '<meta property="og:description" content="d">',
    twitterTitle: `<meta name="twitter:title" content="${title}">`,
    twitterDescription: '<meta name="twitter:description" content="d">',
});

type TagName = keyof ReturnType<typeof tags>;
type Overrides = Partial<Record<TagName, string | null>>;

/**
 * A valid head. A case passes `null` to drop a tag or a string to replace it, so it
 * trips exactly the rule it names instead of whatever else its fixture lacks.
 */
const head = (title: string, path: string, overrides: Overrides = {}) =>
    Object.values({ ...tags(title, path), ...overrides })
        .filter((tag): tag is string => typeof tag === 'string')
        .join('');

const NOINDEX = '<meta name="robots" content="noindex">';

/** The 404 page's head: noindex, so no canonical and no og:url. */
const notFound = (overrides: Overrides = {}) =>
    head('Not found', '/404', { canonical: null, ogUrl: null, ...overrides });

describe('canonicalUrl', () => {
    it.each([
        ['/', 'https://templatical.com/'],
        ['/faq', 'https://templatical.com/faq'],
        ['/faq/', 'https://templatical.com/faq'],
        ['/alternatives/unlayer?ref=x#top', 'https://templatical.com/alternatives/unlayer'],
    ])('%s → %s', (path, expected) => {
        expect(canonicalUrl(path)).toBe(expected);
    });
});

describe('buildSitemap', () => {
    it('lists each indexable route once, on the apex host, sorted', () => {
        expect(buildSitemap(['/faq', '/', '/404', '/faq'])).toBe(
            [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                '  <url><loc>https://templatical.com/</loc></url>',
                '  <url><loc>https://templatical.com/faq</loc></url>',
                '</urlset>',
                '',
            ].join('\n'),
        );
    });
});

describe('auditPages', () => {
    it('passes distinct titles that each carry their own canonical', () => {
        expect(
            auditPages([
                page('/faq', head('FAQ', '/faq')),
                page('/importers', head('Importers', '/importers')),
            ]),
        ).toEqual([]);
    });

    it('fails an empty prerender', () => {
        expect(auditPages([])).toEqual(['no pages were prerendered']);
    });

    it('flags two routes sharing a title', () => {
        expect(
            auditPages([
                page('/faq', head('Same', '/faq')),
                page('/importers', head('Same', '/importers')),
            ]),
        ).toEqual(['/importers: same <title> as /faq']);
    });

    it('flags a missing or wrong canonical', () => {
        expect(auditPages([page('/faq', head('FAQ', '/faq', { canonical: null }))])).toEqual([
            '/faq: canonical [], expected ["https://templatical.com/faq"]',
        ]);
        expect(
            auditPages([
                page('/faq', head('FAQ', '/faq', { canonical: tags('FAQ', '/').canonical })),
            ]),
        ).toEqual([
            '/faq: canonical ["https://templatical.com/"], expected ["https://templatical.com/faq"]',
        ]);
    });

    it('flags a canonical declared twice', () => {
        expect(
            auditPages([page('/faq', head('FAQ', '/faq') + tags('FAQ', '/faq').canonical)]),
        ).toEqual([
            '/faq: canonical ["https://templatical.com/faq","https://templatical.com/faq"], expected ["https://templatical.com/faq"]',
        ]);
    });

    it('flags a page with no <title>', () => {
        expect(auditPages([page('/faq', head('FAQ', '/faq', { title: null }))])).toEqual([
            '/faq: 0 <title> tags',
        ]);
    });

    it('flags a page with no meta description', () => {
        expect(auditPages([page('/faq', head('FAQ', '/faq', { description: null }))])).toEqual([
            '/faq: 0 meta descriptions',
        ]);
    });

    it('flags duplicated title and description tags', () => {
        expect(
            auditPages([
                page(
                    '/faq',
                    head('A', '/faq', {
                        title: '<title>A</title><title>B</title>',
                        description:
                            '<meta name="description" content="1"><meta name="description" content="2">',
                    }),
                ),
            ]),
        ).toEqual(['/faq: 2 <title> tags', '/faq: 2 meta descriptions']);
    });

    describe('document head', () => {
        it('does not count a <title> inside an inline SVG in the body', () => {
            expect(
                auditPages([page('/faq', head('FAQ', '/faq'), '<svg><title>Icon</title></svg>')]),
            ).toEqual([]);
        });

        it('does not count meta or link tags that sit in the body', () => {
            const { description, canonical } = tags('FAQ', '/faq');
            expect(
                auditPages([page('/faq', head('FAQ', '/faq'), description + canonical)]),
            ).toEqual([]);
        });

        it('reads a whole tag when a quoted value holds a ">"', () => {
            // The prerender leaves ">" unescaped inside attribute values.
            expect(auditPages([page('/faq', head('a > b', '/faq'))])).toEqual([]);
            expect(
                auditPages([
                    page(
                        '/faq',
                        head('FAQ', '/faq', {
                            ogDescription: '<meta property="og:description" content="x > y">',
                        }),
                    ),
                ]),
            ).toEqual(['/faq: og:description ["x > y"], expected ["d"]']);
        });
    });

    describe('robots on an indexable page', () => {
        it.each(['noindex', 'index, follow'])('flags a robots tag saying "%s"', (content) => {
            expect(
                auditPages([
                    page('/faq', head('FAQ', '/faq') + `<meta name="robots" content="${content}">`),
                ]),
            ).toEqual([`/faq: robots "${content}" on an indexable page`]);
        });
    });

    describe('the 404 page', () => {
        it('must be marked noindex', () => {
            expect(auditPages([page('/404', notFound())])).toEqual(['/404: not marked noindex']);
            expect(auditPages([page('/404', notFound() + NOINDEX)])).toEqual([]);
        });

        it('is not marked noindex by a robots tag that allows indexing', () => {
            expect(
                auditPages([page('/404', notFound() + '<meta name="robots" content="index">')]),
            ).toEqual(['/404: not marked noindex']);
        });

        it('carries no canonical', () => {
            expect(
                auditPages([
                    page(
                        '/404',
                        notFound({ canonical: tags('Not found', '/404').canonical }) + NOINDEX,
                    ),
                ]),
            ).toEqual(['/404: canonical ["https://templatical.com/404"] on a noindex page']);
        });

        it('carries no og:url', () => {
            expect(
                auditPages([
                    page('/404', notFound({ ogUrl: tags('Not found', '/404').ogUrl }) + NOINDEX),
                ]),
            ).toEqual(['/404: og:url ["https://templatical.com/404"] on a noindex page']);
        });

        it('keeps its social tags in step with its title like any other page', () => {
            expect(
                auditPages([
                    page(
                        '/404',
                        notFound({ ogTitle: '<meta property="og:title" content="Other">' }) +
                            NOINDEX,
                    ),
                ]),
            ).toEqual(['/404: og:title ["Other"], expected ["Not found"]']);
        });
    });

    describe('og:url', () => {
        it('must be the canonical URL of an indexable page', () => {
            expect(auditPages([page('/faq', head('FAQ', '/faq', { ogUrl: null }))])).toEqual([
                '/faq: og:url [], expected ["https://templatical.com/faq"]',
            ]);
            expect(
                auditPages([page('/faq', head('FAQ', '/faq', { ogUrl: tags('FAQ', '/').ogUrl }))]),
            ).toEqual([
                '/faq: og:url ["https://templatical.com/"], expected ["https://templatical.com/faq"]',
            ]);
        });
    });

    describe.each([
        {
            key: 'og:title',
            drop: 'ogTitle',
            expected: 'FAQ',
            tag: (value: string) => `<meta property="og:title" content="${value}">`,
        },
        {
            key: 'og:description',
            drop: 'ogDescription',
            expected: 'd',
            tag: (value: string) => `<meta property="og:description" content="${value}">`,
        },
        {
            key: 'twitter:title',
            drop: 'twitterTitle',
            expected: 'FAQ',
            tag: (value: string) => `<meta name="twitter:title" content="${value}">`,
        },
        {
            key: 'twitter:description',
            drop: 'twitterDescription',
            expected: 'd',
            tag: (value: string) => `<meta name="twitter:description" content="${value}">`,
        },
    ] as const)('$key', ({ key, drop, expected, tag }) => {
        it('must repeat the page it mirrors', () => {
            expect(
                auditPages([page('/faq', head('FAQ', '/faq', { [drop]: tag('Other') }))]),
            ).toEqual([`/faq: ${key} ["Other"], expected ["${expected}"]`]);
        });

        it('is required', () => {
            expect(auditPages([page('/faq', head('FAQ', '/faq', { [drop]: null }))])).toEqual([
                `/faq: ${key} [], expected ["${expected}"]`,
            ]);
        });

        it('appears once', () => {
            expect(auditPages([page('/faq', head('FAQ', '/faq') + tag(expected))])).toEqual([
                `/faq: ${key} ["${expected}","${expected}"], expected ["${expected}"]`,
            ]);
        });
    });

    describe('entities in titles and descriptions', () => {
        it('compares the text a reader sees, not how it is escaped', () => {
            // One text, three spellings: the <title> as written for element content, then
            // two attributes, one of which spells the apostrophe as a numeric reference.
            expect(
                auditPages([
                    page(
                        '/faq',
                        head('Q&amp;A: &lt;fast&gt; "free" it\'s', '/faq', {
                            ogTitle:
                                '<meta property="og:title" content="Q&amp;A: &lt;fast&gt; &quot;free&quot; it&#39;s">',
                            twitterTitle:
                                '<meta name="twitter:title" content="Q&amp;A: &lt;fast&gt; &quot;free&quot; it\'s">',
                        }),
                    ),
                ]),
            ).toEqual([]);
        });

        it('accepts a head exactly as the prerender serializes it', () => {
            // JSDOM escapes & < > in element text, and & and " in attribute values, where
            // < and > stay raw. A no-break space is `&nbsp;` in both.
            expect(
                auditPages([
                    page(
                        '/faq',
                        head('Q&amp;A: &lt;fast&gt; "free" it\'s&nbsp;now', '/faq', {
                            description:
                                '<meta name="description" content="a &amp; b <c> &quot;d&quot;">',
                            ogTitle:
                                '<meta property="og:title" content="Q&amp;A: <fast> &quot;free&quot; it\'s&nbsp;now">',
                            ogDescription:
                                '<meta property="og:description" content="a &amp; b <c> &quot;d&quot;">',
                            twitterTitle:
                                '<meta name="twitter:title" content="Q&amp;A: <fast> &quot;free&quot; it\'s&nbsp;now">',
                            twitterDescription:
                                '<meta name="twitter:description" content="a &amp; b <c> &quot;d&quot;">',
                        }),
                    ),
                ]),
            ).toEqual([]);
        });

        it('reports the decoded text, each entity once', () => {
            expect(
                auditPages([
                    page(
                        '/faq',
                        head('Q&amp;A &amp;lt;', '/faq', {
                            ogTitle: '<meta property="og:title" content="Other &quot;one&quot;">',
                        }),
                    ),
                ]),
            ).toEqual(['/faq: og:title ["Other \\"one\\""], expected ["Q&A &lt;"]']);
        });
    });

    describe('untranslated i18n keys', () => {
        // vue-i18n answers a key it cannot find with the key itself. The social tags then
        // repeat that title, so no other rule in this file has anything to flag.
        const describedAs = (text: string) => ({
            description: `<meta name="description" content="${text}">`,
            ogDescription: `<meta property="og:description" content="${text}">`,
            twitterDescription: `<meta name="twitter:description" content="${text}">`,
        });

        it.each(['faq.meta.title', 'home.meta.title', 'alternatives.easyEmailPro.meta.title'])(
            'flags the <title> "%s"',
            (key) => {
                expect(auditPages([page('/faq', head(key, '/faq'))])).toEqual([
                    `/faq: <title> "${key}" looks like an untranslated i18n key`,
                ]);
            },
        );

        it.each(['faq.meta.description', 'alternatives.easyEmailPro.meta.description'])(
            'flags the meta description "%s"',
            (key) => {
                expect(auditPages([page('/faq', head('FAQ', '/faq', describedAs(key)))])).toEqual([
                    `/faq: meta description "${key}" looks like an untranslated i18n key`,
                ]);
            },
        );

        it('reports the title, then the description, when both are keys', () => {
            expect(
                auditPages([
                    page(
                        '/faq',
                        head('faq.meta.title', '/faq', describedAs('faq.meta.description')),
                    ),
                ]),
            ).toEqual([
                '/faq: <title> "faq.meta.title" looks like an untranslated i18n key',
                '/faq: meta description "faq.meta.description" looks like an untranslated i18n key',
            ]);
        });

        it('checks the noindex 404 page like any other', () => {
            expect(
                auditPages([
                    page(
                        '/404',
                        head('notFound.meta.title', '/404', { canonical: null, ogUrl: null }) +
                            NOINDEX,
                    ),
                ]),
            ).toEqual(['/404: <title> "notFound.meta.title" looks like an untranslated i18n key']);
        });

        // Real titles and descriptions are sentences, so a version number inside one is
        // not a key, and a single dot (a host name) is not the three-part path of one.
        it.each([
            'Source-available email editor SDK — Templatical',
            'Works with Node v22.1.4 and newer',
            'templatical.com',
        ])('leaves the real text "%s" alone', (text) => {
            expect(auditPages([page('/faq', head(text, '/faq', describedAs(text)))])).toEqual([]);
        });
    });
});

const LD = '<script type="application/ld+json">{"@type":"SoftwareApplication"}</script>';

describe('home page structured data', () => {
    it('requires SoftwareApplication JSON-LD on /', () => {
        expect(auditPages([page('/', head('Home', '/'))])).toEqual([
            '/: no SoftwareApplication JSON-LD (found [])',
        ]);
        expect(auditPages([page('/', head('Home', '/') + LD)])).toEqual([]);
    });

    it('names what it found instead', () => {
        const wrongType = '<script type="application/ld+json">{"@type":"WebSite"}</script>';
        const broken = '<script type="application/ld+json">{"@type":</script>';
        expect(auditPages([page('/', head('Home', '/') + wrongType)])).toEqual([
            '/: no SoftwareApplication JSON-LD (found ["WebSite"])',
        ]);
        expect(auditPages([page('/', head('Home', '/') + broken)])).toEqual([
            '/: no SoftwareApplication JSON-LD (found ["(invalid JSON)"])',
        ]);
    });

    it('reads JSON-LD whose text contains a "<"', () => {
        const lessThan =
            '<script type="application/ld+json">{"@type":"SoftwareApplication","description":"in <5 minutes"}</script>';
        expect(auditPages([page('/', head('Home', '/') + lessThan)])).toEqual([]);
    });

    it('asks for it on the home page only', () => {
        expect(auditPages([page('/faq', head('FAQ', '/faq'))])).toEqual([]);
    });

    it('describes the product as source-available with a free offer', () => {
        expect(SOFTWARE_APPLICATION['@type']).toBe('SoftwareApplication');
        expect(SOFTWARE_APPLICATION.url).toBe('https://templatical.com/');
        expect(SOFTWARE_APPLICATION.description).toContain('Source-available under FSL-1.1-MIT');
        expect(SOFTWARE_APPLICATION.offers).toEqual({
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        });
    });
});
