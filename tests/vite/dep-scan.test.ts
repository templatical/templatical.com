import { describe, expect, it } from 'vitest';

/*
    Vite's dependency scanner reads every `import` statement it can find in the
    source tree — including ones that are only ever DISPLAYED, sitting inside a
    template literal as sample code for the reader. It cannot tell the two apart.

    When it meets a specifier it cannot resolve, it does not skip that one import:
    it aborts the entire scan and starts the dev server with pre-bundling disabled
    for the whole project. On this repo that took optimized dependencies from 17
    to 0, which shows up only as a slower cold start and one warning line that
    scrolls past — never as an error, and never in the build.

    That is exactly what `HomeCloseSection.vue`'s `usageCode` snippet did. It
    shows `import '@templatical/editor/style.css'` because that is what a reader
    integrating the SDK would write — but `@templatical/editor` is deliberately
    NOT a dependency here (the hero editor loads it from the unpkg CDN at
    runtime), so nothing on disk can satisfy it.

    The invariant below is what keeps that from recurring: any bare package a
    snippet appears to import must either be a real dependency, or be named in
    `optimizeDeps.exclude` so the scanner stops trying to resolve it. Adding a
    new snippet that imports some other uninstalled package fails this test
    rather than silently costing everyone pre-bundling.
*/

const SRC: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob(['../../src/**/*.vue', '../../src/**/*.ts'], {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    ).map(([path, source]) => [path.replace('../../src/', ''), source] as const),
);

// Read as text rather than imported: package.json would need resolveJsonModule,
// and vite.config.ts runs network fetches at module scope (bundle size, changelog)
// that a unit test must not trigger.
const PACKAGE_JSON = (
    import.meta.glob('../../package.json', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>
)['../../package.json'];

const VITE_CONFIG = (
    import.meta.glob('../../vite.config.ts', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>
)['../../vite.config.ts'];

/** Both `import x from 'pkg'` and the side-effect-only `import 'pkg'`. */
const IMPORT_RE = /^[ \t]*import\s+(?:[\s\S]*?\sfrom\s+)?['"]([^'"]+)['"]/gm;

/** `@scope/name/sub` -> `@scope/name`; `name/sub` -> `name`. */
function packageName(specifier: string): string {
    const parts = specifier.split('/');
    return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

/** Bare specifiers only — relative paths and the `@/` alias are not packages. */
function isBareSpecifier(specifier: string): boolean {
    if (specifier.startsWith('.') || specifier.startsWith('/')) return false;
    if (specifier.startsWith('@/')) return false;
    return true;
}

function importedPackages(): Map<string, string[]> {
    const found = new Map<string, string[]>();
    for (const [file, source] of Object.entries(SRC)) {
        for (const match of source.matchAll(IMPORT_RE)) {
            const specifier = match[1];
            if (!isBareSpecifier(specifier)) continue;
            const pkg = packageName(specifier);
            found.set(pkg, [...(found.get(pkg) ?? []), file]);
        }
    }
    return found;
}

function declaredDependencies(): Set<string> {
    const pkg = JSON.parse(PACKAGE_JSON) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };
    return new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.devDependencies ?? {}),
    ]);
}

/**
 * The `optimizeDeps.exclude` array, read out of the config text. Crude on
 * purpose: importing the config would run its network fetches, and only the
 * literal list matters here.
 */
function excludedFromScan(): Set<string> {
    const block = VITE_CONFIG.match(/optimizeDeps:\s*\{[\s\S]*?exclude:\s*\[([\s\S]*?)\]/);
    if (!block) return new Set();
    return new Set([...block[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]));
}

describe('vite dependency scan', () => {
    it('reads the sources it claims to', () => {
        expect(Object.keys(SRC).length).toBeGreaterThan(40);
        expect(PACKAGE_JSON).toBeTruthy();
        expect(VITE_CONFIG).toBeTruthy();
    });

    it('finds the snippet import that motivated this guard', () => {
        // Proves the matcher actually sees imports inside a template literal,
        // rather than passing because it found nothing at all.
        const pkgs = importedPackages();
        expect(pkgs.has('@templatical/editor')).toBe(true);
        expect(pkgs.get('@templatical/editor')).toContain('components/HomeCloseSection.vue');
    });

    it('every package an import names is either a dependency or excluded from the scan', () => {
        const declared = declaredDependencies();
        const excluded = excludedFromScan();

        const unresolvable = [...importedPackages().entries()]
            .filter(([pkg]) => !declared.has(pkg) && !excluded.has(pkg))
            .map(([pkg, files]) => `${pkg} (in ${files.join(', ')})`);

        expect(unresolvable).toEqual([]);
    });
});
