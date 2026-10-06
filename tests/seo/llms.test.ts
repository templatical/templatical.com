import { describe, expect, it } from 'vitest';
import llms from '../../public/llms.txt?raw';
import { IMPORTERS } from '@/lib/importers';
import { SOFTWARE_APPLICATION } from '@/lib/seo';
import { routes } from '@/router';

/*
    The line that gives the importers. It is read on its own because "MJML" and
    "HTML" turn up elsewhere in the file, so a whole-file match would pass for
    them whatever this line said.
*/
const IMPORTERS_LINE =
    llms.split('\n').find((line) => line.includes('(https://templatical.com/importers)')) ?? '';

const OPEN_SOURCE = /open[- ]?source/i;

describe('llms.txt', () => {
    it('states the licence the way every other surface does', () => {
        expect(llms).toContain(
            'Source-available (FSL-1.1-MIT): free for commercial embedding, no license key, MIT two years after each release.',
        );
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

    // The file is hand-written, so IMPORTERS stays the one list only while this fails the
    // day an entry is added there and not here. The names differ in case ("BeeFree" in the
    // list, "Beefree" in the file); the match does not.
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

/*
    The editor is source-available (FSL-1.1-MIT); "open source" is for the MIT
    packages. These two surfaces are what AI tools quote about the product, and
    neither is a locale string, so tests/copy/license-wording.test.ts never
    reads them.
*/
describe('licence wording outside the locale files', () => {
    it('catches every spelling it guards against', () => {
        for (const spelling of ['open source', 'open-source', 'Open Source', 'opensource'])
            expect(spelling).toMatch(OPEN_SOURCE);
    });

    it.each([
        ['public/llms.txt', llms],
        ['the home page JSON-LD description', SOFTWARE_APPLICATION.description],
    ])('%s does not call the product open source', (_surface, text) => {
        expect(text).not.toMatch(OPEN_SOURCE);
    });
});
