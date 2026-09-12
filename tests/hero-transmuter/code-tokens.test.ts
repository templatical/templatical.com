import { describe, expect, it } from 'vitest';
import { tokenize, type CodeLine } from '@/lib/codeTokens';
import {
    IMPORTER_SAMPLES,
    SAMPLE_MAX_COLUMNS,
    SAMPLE_PANE_LINES,
} from '@/lib/importerSamples';
import { IMPORTERS } from '@/lib/importers';

/** The invariant every pane depends on: tokenizing never loses a byte. */
function flatten(lines: CodeLine[]): string {
    return lines.map((line) => line.map((token) => token.t).join('')).join('\n');
}

function carriesIn(lines: CodeLine[]): number[] {
    return lines.flatMap((line) =>
        line.filter((token) => token.carry !== undefined).map((token) => token.carry!),
    );
}

describe('tokenize', () => {
    it('reproduces the input verbatim, including whitespace and blank lines', () => {
        const code = '{\n  "type": "button",\n\n  "fontSize": 16\n}';
        expect(flatten(tokenize(code, 'json'))).toBe(code);
    });

    it('separates a JSON key from a string value of identical shape', () => {
        const [line] = tokenize('  "text": "Shop now",', 'json');
        const meaningful = line.filter((token) => token.t.trim());
        expect(meaningful).toEqual([
            { t: '"text"', k: 'key' },
            { t: ':', k: 'punct' },
            { t: '"Shop now"', k: 'string' },
            { t: ',', k: 'punct' },
        ]);
    });

    it('classifies JSON numbers and literals', () => {
        const [line] = tokenize('"linkUnderline": false, "width": 600', 'json');
        const kinds = Object.fromEntries(line.filter((t) => t.t.trim()).map((t) => [t.t, t.k]));
        expect(kinds['false']).toBe('literal');
        expect(kinds['600']).toBe('number');
    });

    it('emits an unrecognised byte on its own rather than dropping it', () => {
        expect(flatten(tokenize('{ @ }', 'json'))).toBe('{ @ }');
    });

    it('splits markup into tag, attribute and value tokens', () => {
        const [line] = tokenize('<a class="es-button" href="https://x.test">Go</a>', 'html');
        const meaningful = line.filter((token) => token.t.trim());
        expect(meaningful.map((token) => [token.k, token.t])).toEqual([
            ['tag', '<a'],
            ['attr', 'class'],
            ['punct', '='],
            ['string', '"es-button"'],
            ['attr', 'href'],
            ['punct', '='],
            ['string', '"https://x.test"'],
            ['tag', '>'],
            ['plain', 'Go'],
            ['tag', '</a'],
            ['tag', '>'],
        ]);
    });

    it('keeps a run of prose in one token so it can carry a value whole', () => {
        const [line] = tokenize('<mj-preview>This week</mj-preview>', 'html');
        expect(line.filter((t) => t.k === 'plain').map((t) => t.t)).toEqual([
            'This',
            ' ',
            'week',
        ]);
    });
});

describe('carried values', () => {
    it('splits a carried value out of its enclosing string literal', () => {
        const [line] = tokenize('"text": "Shop now",', 'json', ['Shop now']);
        expect(line).toEqual([
            { t: '"text"', k: 'key' },
            { t: ':', k: 'punct' },
            { t: ' ', k: 'plain' },
            { t: '"', k: 'string' },
            { t: 'Shop now', k: 'string', carry: 0 },
            { t: '"', k: 'string' },
            { t: ',', k: 'punct' },
        ]);
    });

    it('marks only the first occurrence, so a flight has one endpoint', () => {
        const code = '"href": "https://x.test",\n"prefix": "https://x.test"';
        const lines = tokenize(code, 'json', ['https://x.test']);
        expect(carriesIn(lines)).toEqual([0]);
        expect(flatten(lines)).toBe(code);
    });

    it('marks several carried values independently and keeps the text intact', () => {
        const code = '{ "text": "Go", "url": "https://x.test" }';
        const lines = tokenize(code, 'json', ['Go', 'https://x.test']);
        expect(carriesIn(lines)).toEqual([0, 1]);
        expect(flatten(lines)).toBe(code);
    });

    it('carries a value out of a markup text node', () => {
        const lines = tokenize('<p>Shop Now</p>', 'html', ['Shop Now']);
        expect(carriesIn(lines)).toEqual([0]);
        expect(flatten(lines)).toBe('<p>Shop Now</p>');
    });

    it('ignores a carried value that is absent', () => {
        const lines = tokenize('{ "a": 1 }', 'json', ['nowhere']);
        expect(carriesIn(lines)).toEqual([]);
    });
});

describe('the generated samples', () => {
    const samples = Object.values(IMPORTER_SAMPLES);

    it('covers every importer, once', () => {
        expect(Object.keys(IMPORTER_SAMPLES).sort()).toEqual(
            IMPORTERS.map((importer) => importer.slug).sort(),
        );
    });

    it.each(samples.map((sample) => [sample.slug, sample] as const))(
        '%s: every carried value is present in both panes exactly once',
        (_slug, sample) => {
            expect(sample.carried.length).toBeGreaterThan(0);
            const source = tokenize(sample.source, sample.lang, sample.carried);
            const target = tokenize(sample.target, 'json', sample.carried);
            const expected = sample.carried.map((_, i) => i);
            expect(carriesIn(source).sort()).toEqual(expected);
            expect(carriesIn(target).sort()).toEqual(expected);
        },
    );

    it.each(samples.map((sample) => [sample.slug, sample] as const))(
        '%s: tokenizing loses nothing from either pane',
        (_slug, sample) => {
            expect(flatten(tokenize(sample.source, sample.lang, sample.carried))).toBe(
                sample.source,
            );
            expect(flatten(tokenize(sample.target, 'json', sample.carried))).toBe(
                sample.target,
            );
        },
    );

    it.each(samples.map((sample) => [sample.slug, sample] as const))(
        '%s: no line exceeds the width the panel can show without scrolling',
        (_slug, sample) => {
            const widest = [...sample.source.split('\n'), ...sample.target.split('\n')]
                .map((line) => line.length)
                .reduce((a, b) => Math.max(a, b), 0);
            expect(widest).toBeLessThanOrEqual(SAMPLE_MAX_COLUMNS);
        },
    );

    it('shows every pane at the same height, so the panel never jumps', () => {
        for (const sample of samples) {
            expect(sample.source.split('\n')).toHaveLength(SAMPLE_PANE_LINES.source);
            expect(sample.target.split('\n')).toHaveLength(SAMPLE_PANE_LINES.target);
        }
    });

    it('gives every importer at least two flights, and most of them three', () => {
        const counts = samples.map((sample) => sample.carried.length);
        expect(Math.min(...counts)).toBeGreaterThanOrEqual(2);
        expect(counts.filter((n) => n >= 3).length).toBeGreaterThanOrEqual(5);
    });

    it('never carries one value that contains another', () => {
        for (const sample of samples) {
            for (const a of sample.carried) {
                for (const b of sample.carried) {
                    if (a !== b) expect(a.includes(b)).toBe(false);
                }
            }
        }
    });

    it.each(samples.map((sample) => [sample.slug, sample] as const))(
        '%s: the report adds up to its own total',
        (_slug, sample) => {
            const { total, converted, approximated, htmlFallback, skipped } = sample.report;
            expect(converted + approximated + htmlFallback + skipped).toBe(total);
            expect(total).toBeGreaterThan(0);
        },
    );

    it('names the package each sample was produced by', () => {
        for (const sample of samples) {
            expect(sample.pkg).toBe(`@templatical/import-${sample.slug}`);
        }
    });
});
