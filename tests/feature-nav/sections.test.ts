import { describe, expect, it } from 'vitest';
import en from '@/i18n/locales/en';
import de from '@/i18n/locales/de';

/*
    /features indexes itself three times over — the index band under the hero,
    the rail, the jump palette — and all three derive from the same
    `pageSections` the page already renders. These tests hold the two things
    that arrangement depends on and that nothing else would catch.

    The precedent is `IMPORTERS`: the site once advertised three converters
    while the SDK shipped eight, because four surfaces across two locales each
    held their own copy of the list. Nothing failed. Nothing noticed.
*/

/** Source read through Vite: `@types/node` is not installed and tsconfig pins
 *  `types` to `vite/client`, so node:fs is not available here. Same technique
 *  as tests/styles/scoped-css.test.ts. */
const SRC: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob('../../src/**/*.{vue,ts}', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    ).map(([path, source]) => [path.replace('../../src/', ''), source] as const),
);

const FEATURES = SRC['pages/Features.vue'];

describe('feature section slugs', () => {
    const slugs = [...FEATURES.matchAll(/^\s*slug: '([^']+)',$/gm)].map((m) => m[1]);

    it('finds the slug list it is asserting against', () => {
        // A floor, not the exact count — adding a section must not fail this.
        expect(slugs.length).toBeGreaterThanOrEqual(18);
    });

    it('are kebab-case', () => {
        // A slug is a public anchor the moment featureSectionId() sees it, and
        // `#feature-cssIsolation` is a URL nobody types correctly twice. One
        // camelCase slug had already slipped in while slugs were only :key
        // values, where case never mattered.
        expect(slugs.filter((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toEqual([]);
    });

    it('are unique', () => {
        // Each slug becomes a DOM id via featureSectionId() and a public anchor.
        // A duplicate silently sends every jump to whichever section rendered
        // first, and getElementById cannot tell you it happened.
        const seen = new Set<string>();
        const duplicates = slugs.filter((slug) =>
            seen.has(slug) ? true : (seen.add(slug), false),
        );
        expect(duplicates).toEqual([]);
    });
});

/**
 * A hand-written section anchor: a literal `#feature-…` link, or a literal
 * `id="feature-…"`. Deliberately narrow — `feature-col` in a class list and
 * `data-feature-slug` are this page's own vocabulary, not anchors, and an
 * over-broad matcher that flags them teaches the next person to ignore it.
 */
function handWrittenAnchors(source: string): string[] {
    return [...source.matchAll(/(?:id=["']feature-[a-z-]+|#feature-[a-z-]+)/g)].map((m) => m[0]);
}

describe('handWrittenAnchors', () => {
    it('catches a literal href and a literal id', () => {
        expect(handWrittenAnchors('<a href="#feature-comments">')).toEqual(['#feature-comments']);
        expect(handWrittenAnchors('<section id="feature-comments">')).toEqual([
            'id="feature-comments',
        ]);
    });

    it('ignores the page own class and data attributes', () => {
        expect(handWrittenAnchors('class="feature-col flex"')).toEqual([]);
        expect(
            handWrittenAnchors('<section data-feature-slug="comments" data-feature-sticky>'),
        ).toEqual([]);
        expect(handWrittenAnchors(':id="featureSectionId(section.slug)"')).toEqual([]);
    });
});

describe('feature anchors', () => {
    it('are never written by hand', () => {
        // `featureSectionId` is the one place the `feature-` prefix is built. A
        // literal anchor typed into a component or a locale keeps resolving
        // until the slug it names is renamed, and then quietly scrolls nowhere.
        const offenders = Object.entries(SRC)
            .filter(([file]) => file !== 'composables/useFeatureNav.ts')
            .flatMap(([file, source]) =>
                handWrittenAnchors(source).map((match) => `${file}: ${match}`),
            );
        expect(offenders).toEqual([]);
    });
});

describe('features.index copy', () => {
    // Every string the index band, rail and palette render.
    const indexStrings = (locale: typeof en) =>
        JSON.stringify((locale.features as Record<string, unknown>).index);

    it('exists in both locales', () => {
        expect(indexStrings(en)).toContain('Everything on this page');
        expect(indexStrings(de)).toContain('Alles auf dieser Seite');
    });

    it('states no count', () => {
        // The band sits above eighteen sections and derives its rows from them.
        // The moment its copy says how many there are, adding a nineteenth makes
        // the page wrong in two languages with nothing to flag it — the same
        // trap that took the backend band's headline and the importer count.
        // A count here would have to be interpolated, never written.
        expect(indexStrings(en)).not.toMatch(/\d/);
        expect(indexStrings(de)).not.toMatch(/\d/);
        expect(indexStrings(en)).not.toMatch(
            /\b(eighteen|seventeen|nineteen|all of the|every one of)\b/i,
        );
        expect(indexStrings(de)).not.toMatch(/\b(achtzehn|siebzehn|neunzehn)\b/i);
    });
});
