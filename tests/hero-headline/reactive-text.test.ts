import { describe, expect, it } from 'vitest';

/*
    HeroHeadline draws its text as one animated span per character, next to an
    `sr-only` copy. It used to split the text once, at setup, so a locale switch
    re-rendered the `sr-only` copy and left every visible character in the old
    language: a screen reader heard German while the page showed English. Every
    page with a hero had it, and keying the
    component by locale.

    Two halves have to hold, and neither fails anywhere else:

    - The characters derive from the props, so a new `text` re-renders them.
    - The reveal re-runs once the new spans are in the DOM. The spans are keyed by
      position, so Vue reuses the old ones and creates only the surplus. A reused
      span still carries the previous reveal's filled animation, and a new one has
      none, so it sits at the `opacity: 0` the enhanced state gives every character
      until something animates it in. German headlines are longer, so without the
      re-run their tail renders invisible.

    There is no DOM and no .vue transform in this suite, so these pin the source.
*/

const SOURCES: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob('../../src/**/*.vue', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    ).map(([path, source]) => [path.replace('../../src/', ''), source] as const),
);

const HEADLINE = SOURCES['components/HeroHeadline.vue'];

/** The body of a named function declaration, up to its closing brace at column 0. */
const functionBody = (source: string, name: string) =>
    source.match(new RegExp(`\\nfunction ${name}\\([^)]*\\) \\{\\n([\\s\\S]*?)\\n\\}`))?.[1];

describe('HeroHeadline follows its text', () => {
    it('derives the characters from the text and accent props', () => {
        expect(HEADLINE).toMatch(
            /\bconst tokens = computed\(\(\) => computeTokens\(props\.text, props\.accent\)\)/,
        );
        expect(HEADLINE).not.toMatch(/\bconst tokens = computeTokens\(/);
    });

    it('re-runs the reveal after the DOM holds the new characters', () => {
        expect(HEADLINE).toMatch(/\bwatch\(\s*tokens,\s*reveal,\s*\{\s*flush:\s*'post'\s*\}\s*\)/);
        expect(HEADLINE).toMatch(/onMounted\(\(\) => \{[\s\S]*?\breveal\(\);[\s\S]*?\n\}\);/);
    });

    it('collects the spans afresh and cancels the previous reveal before animating', () => {
        const reveal = functionBody(HEADLINE, 'reveal');
        expect(reveal, 'function reveal() in HeroHeadline.vue').toBeDefined();
        const collect = reveal!.indexOf("querySelectorAll<HTMLElement>('.hh__c')");
        const cancel = reveal!.search(/\bof node\.getAnimations\(\)\) animation\.cancel\(\)/);
        const animate = reveal!.indexOf('.animate(');
        expect(collect).toBeGreaterThan(-1);
        expect(cancel).toBeGreaterThan(collect);
        expect(animate).toBeGreaterThan(cancel);
    });

    it('is not keyed by locale anywhere, since nothing needs the remount', () => {
        const keyed = Object.entries(SOURCES).flatMap(([path, source]) =>
            [...source.matchAll(/<HeroHeadline\b[^>]*>/g)]
                .filter(([tag]) => /\s:key="[^"]*\blocale\b/.test(tag))
                .map(([tag]) => `${path}: ${tag}`),
        );
        expect(keyed).toEqual([]);
    });
});
