import { describe, expect, it } from 'vitest';
import { featureSectionId, matchFeatures, type FeatureNavItem } from '@/composables/useFeatureNav';

/*
    The jump palette on /features is the only surface that searches the page,
    and the thing worth protecting is *what* it searches. Matching a section's
    title alone would look right in every manual test — every row still appears,
    every obvious query still works — while quietly failing the queries a
    stranger actually types. "Restore" is the case: no section is called
    restoring anything, but version history's checklist says so.
*/

const ITEMS: FeatureNavItem[] = [
    {
        slug: 'version-history',
        eyebrow: 'History',
        title: 'Browse, preview and restore past versions',
        group: 'backend',
        keywords: ['Restore a version into the editor', 'Every version lives in your own storage'],
    },
    {
        slug: 'media',
        eyebrow: 'Media',
        title: 'A media library, in your own storage',
        group: 'backend',
        keywords: ['Report a quota and the editor shows it'],
    },
    {
        slug: 'theming',
        eyebrow: 'Branding',
        title: 'Theming and brand defaults',
        group: 'core',
        keywords: ['Design tokens drive the whole surface'],
    },
];

const slugs = (items: FeatureNavItem[]) => items.map((item) => item.slug);

describe('matchFeatures', () => {
    it('treats an empty or whitespace query as no filter, not as no results', () => {
        expect(slugs(matchFeatures(ITEMS, ''))).toEqual(['version-history', 'media', 'theming']);
        expect(slugs(matchFeatures(ITEMS, '   '))).toEqual(['version-history', 'media', 'theming']);
    });

    it('matches on the title', () => {
        expect(slugs(matchFeatures(ITEMS, 'media library'))).toEqual(['media']);
    });

    it('matches on the eyebrow, which is the only place some categories are named', () => {
        expect(slugs(matchFeatures(ITEMS, 'branding'))).toEqual(['theming']);
    });

    it('matches on the checklist, which is where the reader-facing verbs live', () => {
        // No section title or eyebrow contains either word.
        expect(slugs(matchFeatures(ITEMS, 'restore'))).toEqual(['version-history']);
        expect(slugs(matchFeatures(ITEMS, 'quota'))).toEqual(['media']);
    });

    it('ANDs the terms, and lets them land in different fields', () => {
        // "storage" is the eyebrow, "quota" is in the checklist.
        expect(slugs(matchFeatures(ITEMS, 'storage quota'))).toEqual(['media']);
        // Both present, but never on the same row.
        expect(slugs(matchFeatures(ITEMS, 'branding quota'))).toEqual([]);
    });

    it('ignores case and surrounding whitespace', () => {
        expect(slugs(matchFeatures(ITEMS, '  ReStOrE  '))).toEqual(['version-history']);
    });

    it('returns nothing rather than everything when a term matches nowhere', () => {
        expect(matchFeatures(ITEMS, 'webhooks')).toEqual([]);
    });

    it('matches on the slug, which is what the URL anchor shows', () => {
        expect(slugs(matchFeatures(ITEMS, 'version-history'))).toEqual(['version-history']);
    });

    it('ranks a name match above a checklist-only match', () => {
        // "storage" is in media's title, but it is also buried in version
        // history's checklist — and version history comes first on the page.
        // Strict page order would answer a reader who typed a section's own
        // name with a different section. This is the real case that made the
        // palette send "comments" to saving-and-loading.
        expect(slugs(matchFeatures(ITEMS, 'storage'))).toEqual(['media', 'version-history']);
    });

    it('keeps page order inside each band, so the rail and the palette agree', () => {
        // Both match on the checklist only; neither is promoted, so the order
        // is the order the sections appear in.
        expect(slugs(matchFeatures(ITEMS, 'the editor'))).toEqual(['version-history', 'media']);
    });
});

describe('featureSectionId', () => {
    it('namespaces the slug, because these ids are the page public anchors', () => {
        expect(featureSectionId('comments')).toBe('feature-comments');
    });
});
