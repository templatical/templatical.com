import { describe, expect, it } from 'vitest';
import workflow from '../../.github/workflows/ci.yml?raw';
import pkg from '../../package.json';

/*
    The CI job names are required checks in the "main" ruleset, so renaming one
    blocks every PR until the ruleset changes too. Each job runs a package
    script, and the typecheck gate assumes vue-tsc exits 0 on a clean tree.
*/
const JOBS = { test: 'test', format: 'format:check', typecheck: 'typecheck' } as const;

function jobBody(name: string): string {
    const start = workflow.indexOf(`\n  ${name}:\n`);
    expect(start, `job ${name}`).toBeGreaterThan(-1);
    const next = workflow.slice(start + 1).search(/\n {2}[a-z-]+:\n/);
    return next === -1 ? workflow.slice(start) : workflow.slice(start, start + 1 + next);
}

describe('.github/workflows/ci.yml', () => {
    it('runs on pull requests and pushes to main with a read-only token', () => {
        expect(workflow).toMatch(/pull_request:\n\s+branches: \[main\]/);
        expect(workflow).toMatch(/push:\n\s+branches: \[main\]/);
        expect(workflow).toMatch(/permissions:\n\s+contents: read/);
    });

    it.each(Object.entries(JOBS))('job %s installs frozen and runs pnpm run %s', (job, script) => {
        const body = jobBody(job);
        expect(body).toContain('pnpm install --frozen-lockfile');
        expect(body).toContain(`run: pnpm run ${script}\n`);
        expect(pkg.scripts).toHaveProperty(script);
    });

    it('typechecks with vue-tsc and no error-count tolerance', () => {
        expect(pkg.scripts.typecheck).toBe('vue-tsc --noEmit -p tsconfig.json');
    });
});
