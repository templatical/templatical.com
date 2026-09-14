import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import {
    buildCadence,
    daysBetween,
    GAP_LABEL_MIN_DAYS,
    releaseDayMs,
    spineGapRem,
    type DatedRelease,
} from '@/lib/releaseTimeline';

/*
    The spine and the cadence plot are the only two places on this site where the
    LAYOUT carries a factual claim: the space between two releases states how many
    days passed, and the plot states when the window's releases landed. Neither can
    be proofread, so both are pinned here.
*/

/** The current shape of the feed: near-daily releases with a few quiet days. */
const WINDOW: DatedRelease[] = [
    { version: '0.38.0', date: '2026-09-12' },
    { version: '0.37.0', date: '2026-09-11' },
    { version: '0.36.0', date: '2026-09-11' },
    { version: '0.35.0', date: '2026-09-08' },
    { version: '0.34.0', date: '2026-09-02' },
    { version: '0.33.0', date: '2026-08-28' },
    { version: '0.32.0', date: '2026-08-21' },
];

describe('releaseDayMs', () => {
    it('parses an ISO release date as UTC midnight', () => {
        expect(releaseDayMs('2026-09-12')).toBe(Date.UTC(2026, 8, 12));
    });

    it('lands exactly on a UTC midnight', () => {
        // The `Z` in the parse is what guarantees this, and this is the assertion
        // that catches its removal without the test having to control the host
        // timezone. A local-time parse is offset by the host's UTC offset, so the
        // result stops being a whole number of days since the epoch on every
        // machine except one already running UTC — it can fail, and never falsely.
        const ms = releaseDayMs('2026-09-12');
        expect(ms).toBe(Date.UTC(2026, 8, 12));
        expect((ms as number) % 86_400_000).toBe(0);
    });

    it('returns null for a missing or unparseable date', () => {
        expect(releaseDayMs(null)).toBeNull();
        expect(releaseDayMs(undefined)).toBeNull();
        expect(releaseDayMs('')).toBeNull();
        expect(releaseDayMs('not-a-date')).toBeNull();
    });
});

describe('daysBetween', () => {
    it('counts whole days forward', () => {
        expect(daysBetween('2026-08-21', '2026-09-12')).toBe(22);
        expect(daysBetween('2026-09-11', '2026-09-12')).toBe(1);
        expect(daysBetween('2026-09-12', '2026-09-12')).toBe(0);
    });

    it('crosses a DST boundary without losing or gaining a day', () => {
        // Europe/Berlin ends DST on 2026-10-25; a naive (to - from) / 86.4e6 in
        // local time returns 1.041… here, which floors and rounds differently.
        expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
    });

    it('returns null when either side has no date', () => {
        expect(daysBetween(null, '2026-09-12')).toBeNull();
        expect(daysBetween('2026-09-12', null)).toBeNull();
    });
});

describe('spineGapRem', () => {
    it('clamps a same-day release to the minimum gap', () => {
        expect(spineGapRem(0)).toBe(1.5);
    });

    it('clamps an archive-sized gap to the maximum', () => {
        // Without this, one three-month gap opens a screen-height hole in the rail
        // and strands the entry below it.
        expect(spineGapRem(8)).toBe(6.5);
        expect(spineGapRem(90)).toBe(6.5);
        expect(spineGapRem(3650)).toBe(6.5);
    });

    it('grows sublinearly, so short gaps stay distinguishable', () => {
        const one = spineGapRem(1);
        const four = spineGapRem(4);
        expect(one).toBe(3.268);
        expect(four).toBe(5.036);
        // Four days is visibly longer than one, but nowhere near four times.
        expect(four).toBeLessThan(one * 2);
    });

    it('is monotonic across the clamped range', () => {
        const gaps = Array.from({ length: 12 }, (_, days) => spineGapRem(days));
        expect(gaps).toEqual([...gaps].sort((a, b) => a - b));
    });

    it('gives an undated release the midpoint, never a same-day cluster', () => {
        expect(spineGapRem(null)).toBe(4);
        expect(spineGapRem(null)).toBeGreaterThan(spineGapRem(0));
    });

    it('treats an out-of-order feed as a same-day gap rather than a negative one', () => {
        expect(spineGapRem(-5)).toBe(spineGapRem(0));
    });
});

describe('buildCadence', () => {
    const cadence = buildCadence(WINDOW);

    it('spans the window and counts every dated release', () => {
        expect(cadence).not.toBeNull();
        expect(cadence?.first).toBe('2026-08-21');
        expect(cadence?.last).toBe('2026-09-12');
        expect(cadence?.spanDays).toBe(22);
        expect(cadence?.releases).toBe(7);
    });

    it('collapses same-day releases into one taller tick', () => {
        // 0.37.0 and 0.36.0 both shipped on the 11th.
        expect(cadence?.days).toHaveLength(6);
        expect(cadence?.days.find((d) => d.date === '2026-09-11')?.count).toBe(2);
        expect(cadence?.busiest).toBe(2);
    });

    it('positions ticks proportionally, oldest at 0 and newest at 1', () => {
        const days = cadence?.days ?? [];
        expect(days[0]).toMatchObject({ date: '2026-08-21', offset: 0 });
        expect(days[days.length - 1]).toMatchObject({ date: '2026-09-12', offset: 1 });
        // 2026-09-02 is 12 days into a 22-day span.
        expect(days.find((d) => d.date === '2026-09-02')?.offset).toBeCloseTo(12 / 22, 10);
    });

    it('emits an origin label plus one gridline per interior month boundary', () => {
        expect(cadence?.months).toEqual([
            { date: '2026-08-21', offset: 0, boundary: false },
            { date: '2026-09-01', offset: 11 / 22, boundary: true },
        ]);
    });

    it('never places a gridline on or past the axis end', () => {
        // A release exactly on the first of a month must not draw a gridline
        // underneath its own tick at offset 1.
        const upToMonthStart = buildCadence([
            { version: '0.2.0', date: '2026-09-01' },
            { version: '0.1.0', date: '2026-08-20' },
        ]);
        expect(upToMonthStart?.months).toEqual([
            { date: '2026-08-20', offset: 0, boundary: false },
        ]);
    });

    it('spans several months without dropping a boundary', () => {
        const long = buildCadence([
            { version: '0.9.0', date: '2026-11-05' },
            { version: '0.1.0', date: '2026-08-05' },
        ]);
        expect(long?.months.map((m) => m.date)).toEqual([
            '2026-08-05',
            '2026-09-01',
            '2026-10-01',
            '2026-11-01',
        ]);
    });

    it('ignores undated releases but still plots the dated ones', () => {
        const mixed = buildCadence([
            { version: '0.3.0', date: '2026-09-12' },
            { version: '0.2.0', date: null },
            { version: '0.1.0', date: '2026-09-10' },
        ]);
        expect(mixed?.releases).toBe(2);
        expect(mixed?.spanDays).toBe(2);
    });

    it('returns null rather than an axis it cannot draw', () => {
        expect(buildCadence([])).toBeNull();
        expect(buildCadence([{ version: '0.1.0', date: '2026-09-12' }])).toBeNull();
        expect(buildCadence([{ version: '0.1.0', date: null }])).toBeNull();
        // Every release on one day: no span to position ticks along. The page
        // drops the figure and stays correct.
        expect(
            buildCadence([
                { version: '0.2.0', date: '2026-09-12' },
                { version: '0.1.0', date: '2026-09-12' },
            ]),
        ).toBeNull();
    });
});

describe('cadence copy', () => {
    /*
        Same rule as `IMPORTER_COUNT`: the moment a headline says "twenty releases"
        in prose it is a claim with no mechanism behind it. Both numbers in the
        cadence line have to arrive as interpolations.
    */
    it.each([
        ['en', en],
        ['de', de],
    ])('%s states no count as a literal', (_locale, messages) => {
        const cadence = messages.changelog.cadence;
        expect(cadence.summary).toContain('{releases}');
        expect(cadence.summary).toContain('{days}');
        expect(cadence.label).toContain('{releases}');
        expect(cadence.summary).not.toMatch(/\d/);
        expect(messages.changelog.spine.gap).toContain('{count}');
        expect(messages.changelog.spine.gap).not.toMatch(/\d/);
    });

    it('labels only gaps a reader would notice', () => {
        expect(GAP_LABEL_MIN_DAYS).toBe(2);
    });
});
