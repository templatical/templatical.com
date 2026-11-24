import type { ChangelogVersion } from '@/composables/useChangelog';

export const COUNTDOWN_LAUNCH = { version: '0.63.0', days: 30 } as const;

type DatedVersion = Pick<ChangelogVersion, 'version' | 'date'>;
type Launch = { version: string; days: number };
const DAY_MS = 86_400_000;

/** The end of the UTC date window, or null when the release is not in the changelog. */
export function launchExpiry(versions: readonly DatedVersion[], launch: Launch): number | null {
    const date = versions.find(({ version }) => version === launch.version)?.date;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const released = Date.parse(`${date}T00:00:00Z`);
    return Number.isFinite(released) ? released + launch.days * DAY_MS : null;
}

export function launchIsActive(
    versions: readonly DatedVersion[],
    launch: Launch,
    now = Date.now(),
): boolean {
    const expiry = launchExpiry(versions, launch);
    return expiry !== null && now >= expiry - launch.days * DAY_MS && now < expiry;
}
