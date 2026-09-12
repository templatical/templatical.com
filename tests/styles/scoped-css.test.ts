import { describe, expect, it } from 'vitest';
import { compileStyle, parse } from 'vue/compiler-sfc';

/*
    `:global()` in a scoped <style> swallows the entire selector unless it *is*
    the entire selector. Vue emits only the global part and silently deletes
    everything else — after it, before it, or in the same compound:

        :global(.dark) .x  ->  .dark
        .a :global(.b)     ->  .b
        .a:global(.b)      ->  .b

    So `:global(.dark) .x { background: ... }` puts that background on <html>
    while `.x` keeps its light value. Nothing catches it: not the build, not
    vue-tsc, not a test, and — when the rule only governs a fallback path — not
    the eye either. That is how HeroAurora's dark fallback aurora shipped broken
    until someone read dist/assets/*.css.

    Standalone `:global(.x)` is correct and load-bearing: HeroTransmuter's ghost
    is built with document.createElement, so it never carries a scope attribute
    and every scoped rule would miss it. The bug is only ever `:global()` sharing
    a selector with something else.

    This runs selectors through the real compiler rather than pattern-matching
    source, so it reports what Vue actually emits and stays honest if the
    transform ever changes.
*/

const SCOPE_ID = 'data-v-test';

/**
 * Every SFC source, read through Vite rather than node:fs — `@types/node` is not
 * installed and tsconfig pins `types` to `vite/client`, so pulling in the
 * builtins to walk a directory would cost a dependency and put node globals in
 * scope across src/, where they do not belong.
 */
const SFC_SOURCES: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob('../../src/**/*.vue', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    )
        .map(([path, source]) => [path.replace('../../src/', ''), source] as const)
        .sort(([a], [b]) => a.localeCompare(b)),
);

/** Split a selector list on its top-level commas, so `:is(a, b)` stays whole. */
function splitSelectorList(prelude: string): string[] {
    const selectors: string[] = [];
    let depth = 0;
    let buffer = '';

    for (const char of prelude) {
        if (char === '(') depth += 1;
        if (char === ')') depth -= 1;

        if (char === ',' && depth === 0) {
            selectors.push(buffer);
            buffer = '';
        } else {
            buffer += char;
        }
    }
    selectors.push(buffer);

    return selectors.map((selector) => selector.trim()).filter(Boolean);
}

/**
 * Every selector written in a style block. Deliberately crude string work rather
 * than a CSS AST: postcss is not a declared dependency here, and under pnpm's
 * strict isolation importing it would resolve locally and fail on CI. Only the
 * rule preludes matter, and a malformed one cannot contain `:global(`.
 */
function selectorsIn(css: string): string[] {
    const preludes: string[] = [];
    let buffer = '';

    for (const char of css.replace(/\/\*[\s\S]*?\*\//g, '')) {
        if (char === '{') {
            preludes.push(buffer);
            buffer = '';
        } else if (char === '}' || char === ';') {
            buffer = '';
        } else {
            buffer += char;
        }
    }

    return preludes
        .map((prelude) => prelude.trim())
        .filter((prelude) => prelude.length > 0 && !prelude.startsWith('@'))
        .flatMap(splitSelectorList);
}

/** True when the selector is one `:global(...)` and nothing else. */
function isStandaloneGlobal(selector: string): boolean {
    if (!selector.startsWith(':global(')) return false;

    let depth = 0;
    for (let i = ':global'.length; i < selector.length; i += 1) {
        if (selector[i] === '(') depth += 1;
        else if (selector[i] === ')') {
            depth -= 1;
            if (depth === 0) return selector.slice(i + 1).trim() === '';
        }
    }
    return false;
}

/**
 * The selectors a scoped block silently loses. A selector that survives the
 * transform keeps the scope attribute; one whose element part was swallowed by
 * `:global()` comes out bare, which is the failure itself.
 */
function swallowedSelectors(css: string): string[] {
    return selectorsIn(css)
        .filter((selector) => selector.includes(':global('))
        .filter((selector) => !isStandaloneGlobal(selector))
        .filter((selector) => {
            const compiled = compileStyle({
                source: `${selector} { color: red }`,
                filename: 'probe.vue',
                id: SCOPE_ID,
                scoped: true,
            }).code;
            return !compiled.includes(`[${SCOPE_ID}`);
        });
}

describe('swallowedSelectors', () => {
    it('reports a `:global()` that eats the rest of its selector', () => {
        expect(swallowedSelectors(':global(.dark) .x { color: red }')).toEqual([
            ':global(.dark) .x',
        ]);
        expect(swallowedSelectors('.a :global(.b) { color: red }')).toEqual(['.a :global(.b)']);
        expect(swallowedSelectors('.a:global(.b) { color: red }')).toEqual(['.a:global(.b)']);
    });

    it('reports only the offending member of a selector list', () => {
        expect(swallowedSelectors(':global(.a), :global(.b) .c { color: red }')).toEqual([
            ':global(.b) .c',
        ]);
    });

    it('looks inside at-rules', () => {
        const css = '@media (min-width: 640px) { :global(.dark) .x { color: red } }';
        expect(swallowedSelectors(css)).toEqual([':global(.dark) .x']);
    });

    it('passes a standalone `:global()`, nested or not', () => {
        expect(swallowedSelectors(':global(.tm-ghost) { position: absolute }')).toEqual([]);
        expect(
            swallowedSelectors('@media (min-width: 640px) { :global(.tm-ghost) { font-size: 12px } }'),
        ).toEqual([]);
    });

    it('passes an ordinary descendant selector, which is the fix for all of the above', () => {
        expect(swallowedSelectors('.dark .x { color: red }')).toEqual([]);
    });
});

describe('src/**/*.vue', () => {
    const scopedBlocks = Object.entries(SFC_SOURCES).flatMap(([file, source]) => {
        const { descriptor } = parse(source, { filename: file });
        return descriptor.styles
            .filter((style) => style.scoped)
            .map((style) => ({ file, css: style.content }));
    });

    it('walks the scoped blocks it claims to', () => {
        // A floor, not the exact count: adding an SFC must not fail this.
        expect(Object.keys(SFC_SOURCES).length).toBeGreaterThan(40);
        expect(scopedBlocks.map((block) => block.file)).toEqual([
            'components/HeroAurora.vue',
            'components/HeroEditor.vue',
            'components/HeroHeadline.vue',
            'components/HeroSection.vue',
            'components/HeroTransmuter.vue',
        ]);
    });

    it('has no selector `:global()` swallows', () => {
        const offenders = scopedBlocks.flatMap(({ file, css }) =>
            swallowedSelectors(css).map((selector) => `${file}: ${selector}`),
        );
        expect(offenders).toEqual([]);
    });
});
