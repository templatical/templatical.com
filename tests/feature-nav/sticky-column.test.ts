import { describe, expect, it } from 'vitest';
import { COLUMN_STICK_TOP, shouldPinColumn } from '@/composables/useFeatureNav';

/*
    Pinning a section's prose while its code block scrolls past is only safe
    when the prose itself fits under the sticky navbar. Pin a column taller than
    that and its last bullets sit permanently off the top of the screen — a
    regression with no error, no failing build, and no visible symptom until
    someone reads that section in that language at that window height.

    The numbers below are measured from the live page at 1440px wide, both
    locales, and they are the reason this is a runtime measurement rather than a
    `min-height` media query: no single constant is correct for both.
*/

const VIEWPORT = { laptop13: 800, common: 900, large: 1000 };

describe('shouldPinColumn', () => {
    it('pins when the code block is taller and the prose fits', () => {
        // en/comments: 616 tall beside a 1200 code block — the biggest win.
        expect(shouldPinColumn(616, 1200, VIEWPORT.common)).toBe(true);
    });

    it('refuses when the prose is taller than the space under the navbar', () => {
        // de/templates: 816 needs 920px of viewport. At 900 it would clip 20px,
        // which is exactly the case a fixed 880px gate would have shipped.
        expect(shouldPinColumn(816, 920, VIEWPORT.common)).toBe(false);
        // The same section on a taller window is fine.
        expect(shouldPinColumn(816, 920, 1000)).toBe(true);
    });

    it('is never worse in either language at the same viewport', () => {
        // en/version-history and its German counterpart. English fits at 900 and
        // pins; German does not fit and declines. Neither clips.
        expect(shouldPinColumn(692, 836, VIEWPORT.common)).toBe(true);
        expect(shouldPinColumn(824, 836, VIEWPORT.common)).toBe(false);
    });

    it('declines when the code block is shorter, so there is nothing to scroll past', () => {
        // en/agent-skill: 788 of prose beside 616 of code.
        expect(shouldPinColumn(788, 616, VIEWPORT.large)).toBe(false);
    });

    it('declines a gap too small to see', () => {
        // de/version-history: 12px of travel. It would pin and do nothing.
        expect(shouldPinColumn(824, 836, 2000)).toBe(false);
        expect(shouldPinColumn(600, 640, 2000)).toBe(false);
        expect(shouldPinColumn(600, 648, 2000)).toBe(true);
    });

    it('treats the fit as inclusive at exactly the available height', () => {
        const room = VIEWPORT.laptop13 - COLUMN_STICK_TOP;
        expect(shouldPinColumn(room, room + 200, VIEWPORT.laptop13)).toBe(true);
        expect(shouldPinColumn(room + 1, room + 200, VIEWPORT.laptop13)).toBe(false);
    });

    it('keeps the offset in step with the stylesheet', () => {
        // `top: 6.5rem` on .feature-col in app.css. 84px navbar + 20px.
        expect(COLUMN_STICK_TOP).toBe(104);
    });
});
