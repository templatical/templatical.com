import { URLS } from '@/lib/urls';

export interface LegalFacts {
    name: string;
    email: string;
}

/** The controller of templatical.com: identity facts, not translated copy. */
export const LEGAL: LegalFacts = {
    name: 'Orkhan Ahmadov',
    email: 'hi@templatical.com',
};

/** Bump when the privacy notice changes. */
export const PRIVACY_UPDATED = '2026-11-24';

/** An ISO day in the reader's language, with the changelog's options so the two match. */
export function formatLegalDate(iso: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${iso}T00:00:00Z`));
}

export type PrivacySectionKey =
    | 'controller'
    | 'hosting'
    | 'analytics'
    | 'fonts'
    | 'github'
    | 'demo'
    | 'storage'
    | 'email'
    | 'rights'
    | 'objection';

export interface PrivacySection {
    /** The i18n namespace under `privacy.sections`. */
    key: PrivacySectionKey;
    /**
     * Hosts the visitor's browser contacts for this processing. The third-party guard
     * (tests/legal/third-parties.test.ts) fails when source contacts a host no section
     * lists, and when a listed host is missing from its section's copy.
     */
    hosts?: readonly string[];
    /** The provider's own privacy policy, linked under the section. */
    policy?: string;
}

/** The privacy notice, in render order. */
export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
    { key: 'controller' },
    { key: 'hosting', policy: URLS.cloudflarePrivacy },
    // Injected by Cloudflare at the edge, so no source file names it: listed by hand.
    { key: 'analytics', hosts: ['static.cloudflareinsights.com'] },
    { key: 'fonts', hosts: ['fonts.bunny.net'], policy: URLS.bunnyPrivacy },
    { key: 'github', hosts: ['api.github.com'], policy: URLS.githubPrivacy },
    // The editor loaded from unpkg fetches video thumbnails itself (SDK videoThumbnailUrl:
    // YouTube's own host, Vimeo's via vumbnail.com), so no source scan here can see them.
    {
        key: 'demo',
        hosts: ['unpkg.com', 'play.templatical.com', 'img.youtube.com', 'vumbnail.com'],
    },
    { key: 'storage' },
    { key: 'email' },
    { key: 'rights' },
    { key: 'objection' },
];

export type StorageItem = 'theme' | 'locale' | 'stars' | 'demo';

export interface StoredEntry {
    /** The exact key, or a namespace prefix ending in ":". */
    key: string;
    area: 'localStorage' | 'sessionStorage';
    /** The i18n key under `privacy.sections.storage.items`. */
    item: StorageItem;
    /** The file that writes it, relative to src/; the storage guard reads it. */
    source: string;
}

/** Everything the site keeps in browser storage, in the order the notice lists it. */
export const BROWSER_STORAGE: readonly StoredEntry[] = [
    {
        key: 'templatical-theme',
        area: 'localStorage',
        item: 'theme',
        source: 'composables/useDarkMode.ts',
    },
    {
        key: 'templatical-locale',
        area: 'localStorage',
        item: 'locale',
        source: 'composables/useLocale.ts',
    },
    {
        key: 'templatical:github-stars',
        area: 'sessionStorage',
        item: 'stars',
        source: 'composables/useGitHubStars.ts',
    },
    {
        key: 'templatical:hero:',
        area: 'sessionStorage',
        item: 'demo',
        source: 'lib/demo-backend/store.ts',
    },
];

/** A namespace prefix reads as one, so `templatical:hero:` shows as `templatical:hero:…`. */
export function displayStorageKey(key: string): string {
    return key.endsWith(':') ? `${key}…` : key;
}
