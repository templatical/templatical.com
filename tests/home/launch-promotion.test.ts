import { describe, expect, it } from 'vitest';
import { COUNTDOWN_LAUNCH, launchExpiry, launchIsActive } from '@/lib/launch-promotion';

const versions = [{ version: '0.63.0', date: '2026-11-23' }];

describe('countdown launch promotion', () => {
    it('uses the matching changelog version date inside the window', () => {
        expect(launchIsActive(versions, COUNTDOWN_LAUNCH, Date.parse('2026-11-24T00:00:00Z'))).toBe(
            true,
        );
    });

    it('expires at the start of day 30 in UTC', () => {
        expect(launchExpiry(versions, COUNTDOWN_LAUNCH)).toBe(Date.parse('2026-12-23T00:00:00Z'));
        expect(launchIsActive(versions, COUNTDOWN_LAUNCH, Date.parse('2026-12-22T23:59:59Z'))).toBe(
            true,
        );
        expect(launchIsActive(versions, COUNTDOWN_LAUNCH, Date.parse('2026-12-23T00:00:00Z'))).toBe(
            false,
        );
    });

    it('stays hidden after expiry or when changelog data is unavailable', () => {
        expect(launchIsActive(versions, COUNTDOWN_LAUNCH, Date.parse('2026-11-22T23:59:59Z'))).toBe(
            false,
        );
        expect(launchIsActive(versions, COUNTDOWN_LAUNCH, Date.parse('2026-12-24T00:00:00Z'))).toBe(
            false,
        );
        expect(launchIsActive([], COUNTDOWN_LAUNCH, Date.parse('2026-11-24T00:00:00Z'))).toBe(
            false,
        );
    });
});
