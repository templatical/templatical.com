import { describe, expect, it } from 'vitest';
import appCss from '../../src/styles/app.css?raw';

/*
    Contrast is the one design constraint here that never throws, never fails a
    build, and cannot be seen reliably by eye — a colour either clears a ratio or
    it does not, and the only way to know is to compute it.

    Two tokens in this palette have already been caught this way. `neutral-400`
    is 2.57:1 on white, fine for a hairline and a fail for any text. And
    `--primary` — the pinned brand orange — is 2.80:1 on white, which is below
    every threshold WCAG 2.1 AA defines: 4.5 for body text, 3.0 for large text,
    3.0 for a focus indicator or any other informative non-text mark. It had
    been the colour of every section eyebrow and every "Read the docs" link on
    the site; 7 of 7 accent strings on `/` and 23 of 23 on `/features` failed.

    The fix was a second token rather than a darker brand: `--primary-text`
    carries the accent wherever the accent is TEXT, and `--primary` keeps its
    exact pinned value for the things it is good at — button and pill grounds,
    the aurora tint, icon fills, decorative dots. So this file guards four
    separate invariants, because each of the four is a different way back into
    the same bug:

      1. `--primary-text` clears 4.5:1 on every surface it can land on, in both
         themes. This is the ratio the token exists for.
      2. `--ring` clears 3:1 — a focus indicator is non-text, so it owes the
         lower bar, but 2.80 missed even that.
      3. `--primary-foreground` clears 4.5:1 ON `--primary`, in both themes.
         Dark mode used to paint white on `#f59145` for 2.33:1, which made the
         most prominent button on the site the worst-contrast text on it.
      4. `--primary` still holds its pinned value exactly, and neither the
         `text-primary` nor the `outline-primary` utility appears anywhere in
         `src/`. Darkening `--primary` is the obvious
         "fix" for all of the above and it is the wrong one — it restyles every
         hero, CTA and glow, and contradicts the brand pin in CLAUDE.md. If that
         is ever genuinely wanted it should be a decision, not a contrast patch,
         so this test makes it loud.

    The maths is WCAG 2.1's own: OKLCH -> OKLab -> linear sRGB -> clip to gamut
    -> relative luminance -> (L1 + 0.05) / (L2 + 0.05). Verified against a real
    Chromium paint path (rasterise the colour to a canvas, read the bytes back)
    before this file was written; the two agree to 8-bit rounding.
*/

type Rgb = readonly [number, number, number];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** OKLab -> linear sRGB, then gamma-encode and clip — what a browser paints. */
function oklchToSrgb(lightness: number, chroma: number, hueDeg: number): Rgb {
    const hue = (hueDeg * Math.PI) / 180;
    const a = chroma * Math.cos(hue);
    const b = chroma * Math.sin(hue);

    const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

    const linear = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];

    return linear.map((channel) => {
        const c = clamp01(channel);
        return clamp01(c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
    }) as unknown as Rgb;
}

function relativeLuminance([r, g, b]: Rgb): number {
    const [R, G, B] = [r, g, b].map((channel) =>
        channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(a: Rgb, b: Rgb): number {
    const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
    return (lighter + 0.05) / (darker + 0.05);
}

/** Rounded the way a report reads, and the way the assertions below are written. */
const ratio = (a: Rgb, b: Rgb) => Math.round(contrast(a, b) * 100) / 100;

function parseOklch(value: string): Rgb {
    const match = value.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
    if (!match) throw new Error(`not a plain oklch() colour: ${value}`);

    const [, rawLightness, percent, chroma, hue] = match;
    const lightness = percent ? Number(rawLightness) / 100 : Number(rawLightness);
    return oklchToSrgb(lightness, Number(chroma), Number(hue));
}

/*
    The declarations of one rule, found by its exact prelude. Deliberately crude
    string work rather than a CSS AST, for the same reason `scoped-css.test.ts`
    avoids one: postcss is not a declared dependency, and under pnpm's strict
    isolation importing it would resolve locally and fail on CI.

    Matching the prelude exactly is what keeps `.dark` off `.dark .section-glow`,
    which appears first in the file and would win an `indexOf`.
*/
function declarationsOf(css: string, prelude: string): Record<string, string> {
    const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
    let cursor = 0;

    while (cursor < source.length) {
        const open = source.indexOf('{', cursor);
        if (open === -1) break;

        const start = Math.max(
            source.lastIndexOf('}', open),
            source.lastIndexOf('{', open - 1),
            source.lastIndexOf(';', open),
        );
        const found = source.slice(start + 1, open).trim();

        let depth = 0;
        let close = open;
        for (; close < source.length; close += 1) {
            if (source[close] === '{') depth += 1;
            else if (source[close] === '}' && --depth === 0) break;
        }

        if (found === prelude) {
            return Object.fromEntries(
                source
                    .slice(open + 1, close)
                    .split(';')
                    .map((line) => line.split(':').map((part) => part.trim()))
                    .filter((parts): parts is [string, string] => parts.length === 2)
                    .filter(([name]) => name.startsWith('--')),
            );
        }
        cursor = open + 1;
    }

    throw new Error(`no rule with prelude \`${prelude}\` in app.css`);
}

const THEME = declarationsOf(appCss, '@theme inline');
const LIGHT = declarationsOf(appCss, ':root');
const DARK = declarationsOf(appCss, '.dark');

/** A token's painted colour in one theme — `.dark` overriding `:root`. */
const token = (name: string, dark: boolean): Rgb => {
    const tokens = dark ? { ...LIGHT, ...DARK } : LIGHT;
    const value = tokens[name] ?? THEME[name];
    if (!value) throw new Error(`no \`${name}\` in app.css`);
    return parseOklch(value);
};

const WHITE = oklchToSrgb(1, 0, 0);

/**
 * `--primary` at `alpha` painted over `base` — what Tailwind's `bg-primary/10`
 * actually produces. `SiteButton`'s soft variant puts accent TEXT on exactly
 * this ground, so the tint is a surface the accent has to clear, and it is the
 * tightest one in the palette: the hover step used to be `/15`, which put the
 * button's own label at 4.41.
 */
const tint = (alpha: number, base: Rgb, dark: boolean): Rgb =>
    token('--primary', dark).map(
        (channel, i) => channel * alpha + base[i] * (1 - alpha),
    ) as unknown as Rgb;

/*
    Every ground an accent string actually lands on. Cards are `bg-white` /
    `dark:bg-neutral-950` rather than the page background, the mobile comparison
    cards are `bg-neutral-50` / `dark:bg-neutral-900`, and the jump palette sits
    on `neutral-900` — so the page background alone is not the worst case in
    either theme.
*/
const SURFACES = {
    light: [
        ['white', WHITE],
        ['--background', token('--background', false)],
        ['neutral-50', token('--color-neutral-50', false)],
        ['neutral-100', token('--color-neutral-100', false)],
    ],
    dark: [
        ['neutral-950', token('--color-neutral-950', true)],
        ['--background', token('--background', true)],
        ['neutral-900', token('--color-neutral-900', true)],
    ],
} satisfies Record<string, [string, Rgb][]>;

/** The soft button's own grounds: rest, then its hover step, in each theme. */
const TINTS = {
    light: [
        ['bg-primary/10 on white', tint(0.1, WHITE, false)],
        ['bg-primary/12 on white (soft hover)', tint(0.12, WHITE, false)],
    ],
    dark: [
        ['bg-primary/10 on neutral-950', tint(0.1, token('--color-neutral-950', true), true)],
        [
            'bg-primary/20 on neutral-950 (soft hover)',
            tint(0.2, token('--color-neutral-950', true), true),
        ],
    ],
} satisfies Record<string, [string, Rgb][]>;

/** Every `.vue` and `.ts` source, read through Vite — see `scoped-css.test.ts`. */
const SOURCES: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob('../../src/**/*.{vue,ts}', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    )
        .map(([path, source]) => [path.replace('../../src/', ''), source] as const)
        .sort(([a], [b]) => a.localeCompare(b)),
);

describe('accent contrast', () => {
    describe.each(['light', 'dark'] as const)('%s theme', (theme) => {
        const dark = theme === 'dark';

        it.each(SURFACES[theme])(
            '--primary-text clears AA body text (4.5:1) on %s',
            (_name, surface) => {
                expect(ratio(token('--primary-text', dark), surface)).toBeGreaterThanOrEqual(4.5);
            },
        );

        it.each(SURFACES[theme])(
            '--ring clears AA non-text contrast (3:1) on %s',
            (_name, surface) => {
                expect(ratio(token('--ring', dark), surface)).toBeGreaterThanOrEqual(3);
            },
        );

        it.each(TINTS[theme])(
            '--primary-text clears AA body text (4.5:1) on %s',
            (_name, ground) => {
                expect(ratio(token('--primary-text', dark), ground)).toBeGreaterThanOrEqual(4.5);
            },
        );

        it('--primary-foreground clears AA body text (4.5:1) on --primary', () => {
            expect(
                ratio(token('--primary-foreground', dark), token('--primary', dark)),
            ).toBeGreaterThanOrEqual(4.5);
        });
    });
});

describe('--primary stays a non-text brand mark', () => {
    /*
        The pin from CLAUDE.md's Design Context, asserted so a contrast fix
        cannot quietly become a rebrand. Change these only alongside that doc.
    */
    it.each([
        ['light', ':root', LIGHT, 'oklch(70% 0.16 55)'],
        ['dark', '.dark', DARK, 'oklch(75% 0.15 55)'],
    ] as const)('holds its pinned value in %s', (_theme, _prelude, tokens, expected) => {
        expect(tokens['--primary']).toBe(expected);
    });

    it('is below every AA threshold as text, which is why --primary-text exists', () => {
        // Not a target — a record of the measurement this whole file came from.
        expect(ratio(token('--primary', false), WHITE)).toBe(2.8);
    });

    /*
        Two utilities name `--primary` in a role it cannot serve. `text-primary`
        is the text one. `outline-primary` is the focus one and was missed on the
        first pass at this — seven call sites in `HeroEditor` and
        `HeroProviderLegend` kept a 2.80:1 focus ring while every token around
        them had been fixed. Focus rings belong to `--ring`, which is also what
        the rest of the site already spells.
    */
    it.each([
        ['text-primary', /text-primary(?![-\w])/, 'text-primary-text'],
        ['outline-primary', /outline-primary(?![-\w])/, 'outline-ring'],
    ])('is never reached through the `%s` utility', (_name, pattern, _instead) => {
        const offenders = Object.entries(SOURCES).flatMap(([path, source]) =>
            source
                .split('\n')
                .map((line, index) => [index + 1, line] as const)
                .filter(([, line]) => pattern.test(line))
                .map(([line]) => `${path}:${line}`),
        );

        expect(offenders).toEqual([]);
    });
});

describe('the global focus outline', () => {
    /*
        `* { @apply border-border outline-ring/50 }` was the shadcn default this
        palette inherited, and the `/50` is unfixable by recolouring: no value of
        the accent hue reaches 3:1 on white at half alpha — the darkest one that
        still reads as the brand tops out at 2.12. So the alpha itself had to go.
    */
    it('paints --ring at full opacity', () => {
        expect(appCss).toMatch(/@apply[^;]*\boutline-ring\b(?!\/)/);
        expect(appCss).not.toMatch(/outline-ring\//);
    });
});
