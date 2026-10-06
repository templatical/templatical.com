import { describe, expect, it } from 'vitest';

/*
    A page with a broken head still builds and renders, so if this wiring goes the
    audit stops guarding anything and nothing else in the build says so. The config
    is read as text, never imported. Importing it runs nothing: the default export is
    an async factory, and the bundle-size and changelog fetches sit in its body. But
    `ssgOptions` lives on the object that factory resolves to, so reaching the hooks
    from a unit test would hit the network on every run.
*/
const CONFIG = Object.values(
    import.meta.glob<string>('../../vite.config.ts', {
        query: '?raw',
        import: 'default',
        eager: true,
    }),
)[0];

/**
 * The body of an `ssgOptions` hook: method shorthand, or a property holding a
 * function. Anchored on the definition, so a comment that names the hook is skipped.
 */
function hookBody(hook: string): string {
    const definition = new RegExp(
        `\\b${hook}\\s*(?::\\s*(?:async\\s+)?)?(?:function\\s*)?\\([^)]*\\)\\s*(?:=>\\s*)?\\{`,
    ).exec(CONFIG);
    expect(definition, `${hook} is defined in vite.config.ts`).not.toBeNull();
    const open = definition!.index + definition![0].length - 1;
    let depth = 0;
    for (let i = open; i < CONFIG.length; i++) {
        if (CONFIG[i] === '{') depth++;
        else if (CONFIG[i] === '}' && --depth === 0) return CONFIG.slice(open + 1, i);
    }
    throw new Error(`${hook} in vite.config.ts has no closing brace`);
}

describe('seo audit wiring in vite.config.ts', () => {
    it('reads the config it claims to', () => {
        expect(CONFIG).toContain('defineConfig');
    });

    it('imports the audit and the sitemap builder from seo.ts, extension included', () => {
        // The extension keeps Vite's native config loader from rejecting the import.
        const names =
            CONFIG.match(/import\s*\{([^}]*)\}\s*from\s*['"]\.\/src\/lib\/seo\.ts['"]/)?.[1] ?? '';
        expect(names, "names imported from './src/lib/seo.ts'").toMatch(/\bauditPages\b/);
        expect(names, "names imported from './src/lib/seo.ts'").toMatch(/\bbuildSitemap\b/);
    });

    it('collects every rendered page', () => {
        expect(hookBody('onPageRendered')).toMatch(/renderedPages\.push\(/);
    });

    it('audits the collected pages and fails the build on any problem', () => {
        const finished = hookBody('onFinished');
        expect(finished).toMatch(/auditPages\(\s*renderedPages\s*\)/);
        expect(finished).toMatch(
            /if\s*\(\s*problems\.length\b[^)]*\)\s*\{?\s*throw\s+new\s+Error\(/,
        );
    });

    it('writes the sitemap from the rendered routes', () => {
        expect(hookBody('onFinished')).toMatch(
            /writeFile\([\s\S]*?sitemap\.xml[\s\S]*?buildSitemap\(/,
        );
    });
});
