import { describe, expect, it } from 'vitest';
import llms from '../../public/llms.txt?raw';
import { IMPORTERS } from '@/lib/importers';
import { SOFTWARE_APPLICATION } from '@/lib/seo';
import { routes } from '@/router';

const IMPORTERS_LINE =
    llms.split('\n').find((line) => line.includes('(https://templatical.com/importers)')) ?? '';

describe('llms.txt', () => {
    it('states that every package is MIT-licensed', () => {
        expect(llms).toContain('All packages are MIT-licensed and open source.');
    });

    it('starts the home JSON-LD description with the llms.txt summary sentence', () => {
        const summary = llms.match(/^> (.+?\.) /m)?.[1];
        expect(summary).toBeDefined();
        expect(SOFTWARE_APPLICATION.description.startsWith(summary!)).toBe(true);
    });

    it('gives both install commands', () => {
        expect(llms).toContain('`npm install @templatical/editor`');
        expect(llms).toContain('`npx skills add templatical/sdk`');
    });

    it('links every comparison page on the apex host', () => {
        const alternatives = routes
            .map((route) => route.path)
            .filter((path) => path.startsWith('/alternatives/'));
        expect(alternatives.length).toBeGreaterThan(0);
        for (const path of alternatives)
            expect(llms, path).toContain(`(https://templatical.com${path})`);
    });

    it('points agents at the docs index', () => {
        expect(llms).toContain('(https://docs.templatical.com/llms.txt)');
        expect(llms).toContain('(https://docs.templatical.com/llms-full.txt)');
    });

    it('names every importer the site lists, in any case', () => {
        expect(IMPORTERS_LINE, 'a line that links https://templatical.com/importers').not.toBe('');
        const named = IMPORTERS_LINE.toLowerCase();
        expect(
            IMPORTERS.filter(({ name }) => !named.includes(name.toLowerCase())).map(
                ({ name }) => name,
            ),
        ).toEqual([]);
    });
});
