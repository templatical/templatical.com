import { describe, expect, it } from 'vitest';
import { URLS } from '@/lib/urls';

/*
    The Agent Skill's install path changed twice over, and both halves of the
    change are the kind this site has no other way to catch.

    It used to be two Claude-Code-only slash commands against a plugin
    marketplace (`/plugin marketplace add`, then `/plugin install
    templatical-email@templatical`). It is now one command — `npx skills add
    templatical/sdk` — which reads the repository directly, detects whichever
    SKILL.md-reading agents are installed, and writes into each one's own skills
    directory. Nothing about the old path degrades gracefully: the marketplace
    and the `templatical-email` plugin both stop existing, so a restored slash
    command is a dead instruction printed next to a Copy button.

    At the same time the two skills (`templatical-email`, `templatical-sdk`)
    collapsed into one named `templatical`, which moved the source directory.
    A link to either retired name is a 404 from a CTA.

    Neither failure is visible to the build, to vue-tsc, or to the eye — the page
    renders perfectly either way — which is exactly the failure mode this repo
    keeps re-learning: a claim that was true when written, with no mechanism
    holding it true.
*/

/**
 * Every source file under src/, read through Vite rather than node:fs.
 * `@types/node` is not installed and tsconfig pins `types` to `vite/client`, so
 * walking a directory would cost a dependency and put node globals in scope
 * across src/. Same approach as tests/styles/scoped-css.test.ts.
 */
const SRC_SOURCES: Record<string, string> = Object.fromEntries(
    Object.entries(
        import.meta.glob(['../../src/**/*.vue', '../../src/**/*.ts'], {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    )
        .map(([path, source]) => [path.replace('../../src/', ''), source] as const)
        .sort(([a], [b]) => a.localeCompare(b)),
);

/** The slash commands the plugin-marketplace era used. */
const RETIRED_PLUGIN_COMMAND = /\/plugin\s+(marketplace|install)\b/;

/** Both retired skill names, which no longer exist as directories in the SDK repo. */
const RETIRED_SKILL_NAMES = /templatical-email|templatical-sdk/;

describe('agent skill install path', () => {
    it('reads the source tree it claims to', () => {
        // A floor, not an exact count: adding a file must not fail this.
        expect(Object.keys(SRC_SOURCES).length).toBeGreaterThan(40);
        expect(SRC_SOURCES).toHaveProperty('components/HomeAiSkillSection.vue');
        expect(SRC_SOURCES).toHaveProperty('lib/urls.ts');
    });

    it('offers the one-command npx install on the home page', () => {
        expect(SRC_SOURCES['components/HomeAiSkillSection.vue']).toContain(
            'npx skills add templatical/sdk',
        );
    });

    it('has no trace of the retired plugin-marketplace install anywhere in src', () => {
        const offenders = Object.entries(SRC_SOURCES)
            .filter(([, source]) => RETIRED_PLUGIN_COMMAND.test(source))
            .map(([file]) => file);

        expect(offenders).toEqual([]);
    });

    it('links the skill directory that actually exists', () => {
        expect(URLS.skillRepo).toBe(
            'https://github.com/templatical/sdk/tree/main/skills/templatical',
        );
        expect(URLS.skillRepo).not.toMatch(RETIRED_SKILL_NAMES);
    });

    it('names no retired skill anywhere in src', () => {
        const offenders = Object.entries(SRC_SOURCES)
            .filter(([, source]) => RETIRED_SKILL_NAMES.test(source))
            .map(([file]) => file);

        expect(offenders).toEqual([]);
    });
});
