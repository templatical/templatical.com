import { describe, expect, it } from 'vitest';
import config from '../../renovate.json';

/*
    Renovate merges package rules in order, so a later rule can put a package
    back into a group or turn automerge off. These assertions pin the rules that
    must survive that merge: TypeScript stays below 7, the head stack and the
    SDK each move as one non-automerge group, majors stay manual, and the Shiki
    language/theme packages stay with shiki.
*/

interface PackageRule {
    description: string;
    matchPackageNames?: readonly string[];
    matchUpdateTypes?: readonly string[];
    automerge?: boolean;
    allowedVersions?: string;
    groupName?: string | null;
}

const rules = config.packageRules as readonly PackageRule[];

/** Locate a rule by the package pattern it lists, never by array index. */
function ruleFor(packageName: string): PackageRule | undefined {
    return rules.find((rule) => rule.matchPackageNames?.includes(packageName));
}

describe('renovate.json', () => {
    it('caps typescript below 7', () => {
        expect(ruleFor('typescript')?.allowedVersions).toBe('<7');
    });

    it('keeps @unhead/vue and vite-ssg in one group that does not automerge', () => {
        const unhead = ruleFor('@unhead/vue');
        const viteSsg = ruleFor('vite-ssg');

        expect(unhead).toBeDefined();
        expect(viteSsg).toBe(unhead);
        expect(unhead?.groupName).toBe('unhead + vite-ssg');
        expect(unhead?.automerge).toBe(false);
    });

    it('groups @templatical/** and does not automerge it', () => {
        const sdk = ruleFor('@templatical/**');

        expect(sdk?.groupName).toBe('templatical sdk');
        expect(sdk?.automerge).toBe(false);
    });

    it('never automerges majors', () => {
        const major = rules.find(
            (rule) => rule.matchUpdateTypes?.length === 1 && rule.matchUpdateTypes[0] === 'major',
        );

        expect(major?.automerge).toBe(false);

        for (const rule of rules) {
            if (rule.automerge !== true) continue;
            expect(rule.matchUpdateTypes).toBeDefined();
            expect(rule.matchUpdateTypes).not.toContain('major');
        }
    });

    it('groups @shikijs/** with shiki', () => {
        const shiki = ruleFor('shiki');

        expect(shiki).toBeDefined();
        expect(ruleFor('@shikijs/**')).toBe(shiki);
        expect(shiki?.groupName).toBe('shiki');
    });
});
