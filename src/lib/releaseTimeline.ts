/**
 * Turns a release list into the two time-shaped views `/changelog` renders: the
 * vertical spine (gaps proportional to elapsed days) and the cadence plot in the
 * hero (one tick per release day on a proportional axis).
 *
 * Everything here is pure and derives from `__CHANGELOG__` alone. Nothing on the
 * page states a cadence in prose — the spacing and the plot ARE the claim, so
 * they stay true when the release rhythm changes without anyone editing copy.
 * Same discipline as `IMPORTERS`, for the same reason.
 */

const DAY_MS = 86_400_000;

/** A release, reduced to the two fields this module needs. */
export interface DatedRelease {
    version: string;
    date: string | null;
}

/**
 * UTC midnight for an ISO `YYYY-MM-DD`, or null when the date is absent or
 * unparseable — 3 of the SDK's 97 releases carry no date.
 *
 * The `Z` is load-bearing. `Date.parse('2026-09-12T00:00:00')` is LOCAL time,
 * so west of Greenwich every release would land a day early and a same-day pair
 * could read as a one-day gap. A release date is a day, not an instant; the
 * whole module stays in UTC, including the `Intl` formatting on the page.
 */
export function releaseDayMs(date: string | null | undefined): number | null {
    if (!date) return null;
    const parsed = Date.parse(`${date}T00:00:00Z`);
    return Number.isNaN(parsed) ? null : parsed;
}

/** Whole days from `earlier` to `later`; null when either date is missing. */
export function daysBetween(
    earlier: string | null | undefined,
    later: string | null | undefined,
): number | null {
    const from = releaseDayMs(earlier);
    const to = releaseDayMs(later);
    if (from === null || to === null) return null;
    return Math.round((to - from) / DAY_MS);
}

/**
 * Rail spacing, in rem, for an entry that shipped `days` after the one above it.
 *
 * Uniform spacing made twenty releases in twenty-two days look exactly like
 * twenty releases in twenty months, which is the one thing an evaluator is on
 * this page to find out. Proportional spacing puts that back.
 *
 * Three properties matter more than the exact curve:
 *
 * - It is CLAMPED at both ends. A same-day pair still needs enough room for its
 *   own dot and heading, and the archive contains gaps of months — unclamped,
 *   one of those would open a screen-height hole and strand the entry below it.
 * - It is SUBLINEAR. Four days should read as clearly longer than one, but not
 *   four times longer; a square root keeps the short gaps distinguishable, which
 *   is where the current release rhythm actually lives.
 * - An UNDATED release takes the midpoint rather than the minimum, so a missing
 *   date never fakes a same-day cluster.
 */
const GAP_MIN_REM = 1.5;
const GAP_MAX_REM = 6.5;
const GAP_CAP_DAYS = 8;

export function spineGapRem(days: number | null): number {
    if (days === null) return (GAP_MIN_REM + GAP_MAX_REM) / 2;
    const clamped = Math.min(Math.max(days, 0), GAP_CAP_DAYS);
    const eased = Math.sqrt(clamped / GAP_CAP_DAYS);
    return Number((GAP_MIN_REM + (GAP_MAX_REM - GAP_MIN_REM) * eased).toFixed(3));
}

/**
 * Gaps below this stay unlabelled: the spacing alone reads as "the next day", and
 * a `+1 day` marker on almost every entry would be noise rather than an axis.
 */
export const GAP_LABEL_MIN_DAYS = 2;

/** One release day, positioned on the cadence axis. */
export interface CadenceDay {
    date: string;
    count: number;
    /** 0 at the oldest rendered release, 1 at the newest. */
    offset: number;
}

/** An axis label. The first has no gridline — it sits at the axis origin. */
export interface CadenceMonth {
    date: string;
    offset: number;
    boundary: boolean;
}

export interface Cadence {
    days: CadenceDay[];
    months: CadenceMonth[];
    first: string;
    last: string;
    releases: number;
    spanDays: number;
    /** Releases on the busiest single day — the tick-height scale. */
    busiest: number;
}

/** UTC `YYYY-MM-DD` for the first of the month `offsetMonths` after `ms`. */
function monthStartISO(ms: number, offsetMonths: number): string {
    const d = new Date(ms);
    const start = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + offsetMonths, 1);
    return new Date(start).toISOString().slice(0, 10);
}

/**
 * Builds the hero's cadence plot, or null when there is nothing to plot.
 *
 * Null on fewer than two dated releases, and null on a zero-day span: both leave
 * no axis to position ticks along, and the page simply omits the figure rather
 * than dividing by zero or drawing a one-point "range". Twenty releases inside a
 * single day is not a real case; a build that hit it would lose the plot and
 * keep every other part of the page correct.
 */
export function buildCadence(versions: readonly DatedRelease[]): Cadence | null {
    const dated = versions.filter((v) => releaseDayMs(v.date) !== null);
    if (dated.length < 2) return null;

    const perDay = new Map<string, number>();
    for (const release of dated) {
        const date = release.date as string;
        perDay.set(date, (perDay.get(date) ?? 0) + 1);
    }

    const sorted = [...perDay.keys()].sort();
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const spanDays = daysBetween(first, last) ?? 0;
    if (spanDays <= 0) return null;

    const at = (date: string) => (daysBetween(first, date) ?? 0) / spanDays;

    const days: CadenceDay[] = sorted.map((date) => ({
        date,
        count: perDay.get(date) ?? 0,
        offset: at(date),
    }));

    const firstMs = releaseDayMs(first) as number;
    const months: CadenceMonth[] = [{ date: first, offset: 0, boundary: false }];
    for (let i = 1; ; i++) {
        const start = monthStartISO(firstMs, i);
        const offset = at(start);
        if (offset >= 1) break;
        months.push({ date: start, offset, boundary: true });
    }

    return {
        days,
        months,
        first,
        last,
        releases: dated.length,
        spanDays,
        busiest: Math.max(...days.map((d) => d.count)),
    };
}
