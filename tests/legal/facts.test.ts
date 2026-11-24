import { describe, expect, it } from 'vitest';
import { formatLegalDate, LEGAL, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '@/lib/legal';
import { URLS } from '@/lib/urls';

/* The controller's identity and the notice's processing list live in one tracked module. */

describe('legal facts', () => {
    it('names the provider and the contact address', () => {
        expect(LEGAL.name).toBe('Orkhan Ahmadov');
        expect(LEGAL.email).toBe('hi@templatical.com');
    });

    it('dates the privacy notice with a real day that has already happened', () => {
        expect(PRIVACY_UPDATED).toBe('2026-11-24');
        expect(PRIVACY_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const day = new Date(`${PRIVACY_UPDATED}T00:00:00Z`).getTime();
        expect(Number.isNaN(day)).toBe(false);
        expect(day).toBeLessThanOrEqual(Date.now());
    });

    it('formats the date the way the changelog does, in each language', () => {
        expect(formatLegalDate('2026-10-20', 'en')).toBe('October 20, 2026');
        expect(formatLegalDate('2026-10-20', 'de')).toBe('20. Oktober 2026');
    });
});

describe('privacy sections', () => {
    it('renders in the approved order', () => {
        expect(PRIVACY_SECTIONS.map((section) => section.key)).toEqual([
            'controller',
            'hosting',
            'analytics',
            'fonts',
            'github',
            'demo',
            'storage',
            'email',
            'rights',
            'objection',
        ]);
    });

    it('links each provider’s own policy where the copy points to one', () => {
        const policies = Object.fromEntries(
            PRIVACY_SECTIONS.filter((section) => section.policy).map((s) => [s.key, s.policy]),
        );
        expect(policies).toEqual({
            hosting: URLS.cloudflarePrivacy,
            fonts: URLS.bunnyPrivacy,
            github: URLS.githubPrivacy,
        });
    });
});
