import { describe, expect, it } from 'vitest';

/*
    HeroAurora's header comment tells a contributor how to confirm that the overlay
    has swallowed the heading of the section below it. That advice depends on a class
    in the same file: the root is `pointer-events-none`, which inherits into every
    layer, and a hit test skips elements that take no pointer events. So a plain
    `document.elementFromPoint()` at the heading returns the heading whether or not
    the overlay covers it, and the check passes on exactly the broken page.

    The comment shipped with that plain check once. This keeps the advice and the
    class together: while the root is inert, the comment has to include the override
    that makes the overlay answer a hit test again.
*/

const AURORA = Object.values(
    import.meta.glob('../../src/components/HeroAurora.vue', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>,
)[0];

const HEADER = AURORA.match(/^<!--([\s\S]*?)-->/)?.[1];

describe('HeroAurora hit-test advice', () => {
    it('has a root that takes no pointer events', () => {
        expect(AURORA).toMatch(/'hero-aurora\b[^']*\bpointer-events-none\b/);
    });

    it('turns pointer events back on before hit-testing, then reverts', () => {
        expect(HEADER, 'the leading <!-- --> comment in HeroAurora.vue').toBeDefined();
        expect(HEADER).toMatch(/elementFromPoint\(\)/);
        expect(HEADER).toMatch(/\.hero-aurora, \.hero-aurora \* \{ pointer-events: auto \}/);
        expect(HEADER).toMatch(/\bremove the\s+override\b/i);
    });
});
