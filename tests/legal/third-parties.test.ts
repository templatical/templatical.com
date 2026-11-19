import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { PRIVACY_SECTIONS } from '@/lib/legal';
import { LOCALIZED_URLS, URLS } from '@/lib/urls';
import indexHtml from '../../index.html?raw';

/*
    The privacy notice names every third party a visitor's browser contacts. This test
    derives that set from the source instead of trusting the copy. It reads index.html and
    every .vue, .ts and .css file under src/, and takes each http(s), ws(s) and
    protocol-relative URL it finds. A host is either a link (a URLS / LOCALIZED_URLS host),
    an inert name nothing ever requests, or a host the browser contacts, and those must be
    listed in a PRIVACY_SECTIONS entry and named in that section's copy in both languages.
    A new fetch, script, stylesheet or socket on another host fails here until the notice
    covers it.
*/

const SOURCES = import.meta.glob(
    ['../../src/**/*.vue', '../../src/**/*.ts', '../../src/**/*.css'],
    {
        query: '?raw',
        import: 'default',
        eager: true,
    },
) as Record<string, string>;

/** Hosts that appear in source but are never requested by this site. */
const INERT = new Set([
    'www.w3.org', // SVG namespace
    'www.sitemaps.org', // sitemap namespace
    'schema.org', // JSON-LD vocabulary
    'opensource.org', // JSON-LD licence URL, not requested by the browser
    'templatical.com', // this site's own origin, for canonical URLs
]);

/** Reserved for documentation (RFC 2606): placeholder links and sample data. */
const RESERVED = /(^|\.)(example\.(com|org|net)|[a-z0-9-]+\.test)$/;

/** The generated vendor JSON the /importers hero displays: its URLs are text on screen. */
const DISPLAY_ONLY = new Set(['../../src/lib/importerSamples.ts']);

const LINK_HOSTS = new Set(
    [
        ...Object.values(URLS),
        ...Object.values(LOCALIZED_URLS).flatMap((byLocale) => Object.values(byLocale)),
    ].map((url) => new URL(url).hostname),
);

function hostsIn(text: string): string[] {
    return [...text.matchAll(/(?:\b(?:https?|wss?):)?\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)+)/gi)].map(
        ([, host]) => host.toLowerCase(),
    );
}

const contacted = new Map<string, string[]>();
for (const [file, text] of [['index.html', indexHtml], ...Object.entries(SOURCES)] as const) {
    if (DISPLAY_ONLY.has(file)) continue;
    for (const host of hostsIn(text)) {
        if (LINK_HOSTS.has(host) || INERT.has(host) || RESERVED.test(host)) continue;
        contacted.set(host, [...(contacted.get(host) ?? []), file]);
    }
}

const listed = new Set(PRIVACY_SECTIONS.flatMap((section) => section.hosts ?? []));

describe('third parties in the privacy notice', () => {
    it('finds the hosts the site is known to contact, so the scan reads real source', () => {
        expect([...contacted.keys()]).toEqual(
            expect.arrayContaining(['api.github.com', 'fonts.bunny.net', 'unpkg.com']),
        );
    });

    it('reads the stylesheets as source, not as the empty string vitest stubs them to', () => {
        const stylesheets = Object.entries(SOURCES).filter(([file]) => file.endsWith('.css'));
        expect(stylesheets.length).toBeGreaterThan(0);
        for (const [file, text] of stylesheets) expect(text.trim(), file).not.toBe('');
    });

    it('lists every host the browser contacts in a privacy section', () => {
        const missing = [...contacted.entries()]
            .filter(([host]) => !listed.has(host))
            .map(([host, files]) => `${host} (${[...new Set(files)].join(', ')})`);
        expect(missing).toEqual([]);
    });

    it('lists the analytics beacon Cloudflare injects at the edge, which no scan can see', () => {
        const analytics = PRIVACY_SECTIONS.find((section) => section.key === 'analytics');
        expect(analytics?.hosts).toContain('static.cloudflareinsights.com');
    });

    it('lists the thumbnail hosts the CDN-loaded editor contacts, which no scan can see', () => {
        const demo = PRIVACY_SECTIONS.find((section) => section.key === 'demo');
        expect(demo?.hosts).toContain('img.youtube.com');
        expect(demo?.hosts).toContain('vumbnail.com');
    });

    it.each([
        ['en', en],
        ['de', de],
    ] as const)('names each listed host in its own section’s copy (%s)', (_locale, messages) => {
        for (const section of PRIVACY_SECTIONS) {
            const copy = JSON.stringify(messages.privacy.sections[section.key]);
            for (const host of section.hosts ?? []) expect(copy, section.key).toContain(host);
        }
    });
});
