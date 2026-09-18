import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * security.txt (RFC 9116) carries a MANDATORY `Expires` date, so the file rots
 * on a timer with nothing else to notice. A lapsed one advertises an abandoned
 * disclosure channel, which is worse than publishing none at all — a researcher
 * reads it as "nobody is home" and either drops the report or goes public.
 *
 * So this fails 30 days *before* expiry, while there is still runway to renew,
 * and it caps how far out the date may be pushed: setting `Expires` to 2099
 * satisfies "not expired" while defeating the point of the field, which exists
 * precisely so a stale contact stops being trusted.
 */

const FILE = join(import.meta.dirname, '../../public/.well-known/security.txt');

const RENEW_WINDOW_DAYS = 30;
const MAX_LIFETIME_DAYS = 366; // RFC 9116: "RECOMMENDED ... less than a year"
const DAY_MS = 24 * 60 * 60 * 1000;

/** Field values by lowercased name; comments and blank lines dropped. */
function fields(): Map<string, string[]> {
    const parsed = new Map<string, string[]>();
    for (const raw of readFileSync(FILE, 'utf8').split('\n')) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const at = line.indexOf(':');
        expect(at, `not a field line: ${line}`).toBeGreaterThan(0);
        const name = line.slice(0, at).trim().toLowerCase();
        const value = line.slice(at + 1).trim();
        parsed.set(name, [...(parsed.get(name) ?? []), value]);
    }
    return parsed;
}

describe('security.txt', () => {
    it('carries the two fields RFC 9116 requires', () => {
        const f = fields();

        expect(f.get('contact')).toEqual([
            'https://github.com/templatical/sdk/security/advisories/new',
            'mailto:security@templatical.com',
        ]);
        expect(f.get('expires')).toHaveLength(1);
    });

    it('names a mailbox that exists', () => {
        // security@ is one of the three addresses the domain has on iCloud+.
        // A contact address nobody reads is the failure this file exists to avoid.
        const mailtos = (fields().get('contact') ?? []).filter((v) => v.startsWith('mailto:'));

        expect(mailtos).toEqual(['mailto:security@templatical.com']);
    });

    it('is not within 30 days of expiring', () => {
        const expires = new Date(fields().get('expires')![0]);
        expect(Number.isNaN(expires.getTime())).toBe(false);

        const daysLeft = Math.floor((expires.getTime() - Date.now()) / DAY_MS);
        expect(
            daysLeft,
            `security.txt expires in ${daysLeft} days — push Expires out and redeploy`,
        ).toBeGreaterThan(RENEW_WINDOW_DAYS);
    });

    it('does not push Expires so far out that the field stops meaning anything', () => {
        const expires = new Date(fields().get('expires')![0]);
        const daysOut = Math.floor((expires.getTime() - Date.now()) / DAY_MS);

        expect(daysOut).toBeLessThanOrEqual(MAX_LIFETIME_DAYS);
    });

    it('points Canonical at the URL the file is actually served from', () => {
        expect(fields().get('canonical')).toEqual([
            'https://templatical.com/.well-known/security.txt',
        ]);
    });
});
