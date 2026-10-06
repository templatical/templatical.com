import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';

function leaves(value: unknown, prefix = ''): [string, string][] {
    if (typeof value === 'string') return [[prefix, value]];
    if (Array.isArray(value)) return value.flatMap((item, i) => leaves(item, `${prefix}[${i}]`));
    if (value !== null && typeof value === 'object') {
        return Object.entries(value).flatMap(([key, child]) =>
            leaves(child, prefix ? `${prefix}.${key}` : key),
        );
    }
    return [];
}

const OPEN_SOURCE = /open[- ]source|quelloffen/i;

/*
    The editor, core and media library are FSL-1.1-MIT: source-available, not
    open source. "Open source" stays only where it is true: the MIT Agent Skill
    and importers, and GrapesJS or a generic web-builder framework on the
    comparison pages. A new string that calls the product open source fails
    here until it is reworded, or added below if it is about one of those.
*/
const ALLOWED = [
    'alternatives.grapesjs.footnote.verified',
    'alternatives.grapesjs.meta.description',
    'features.agentSkill.description',
    'features.migration.description',
    'home.aiSkill.eyebrow',
    'home.aiSkill.subheadline',
    'home.comparison.columns.diy.description',
];

describe.each([
    ['en', en],
    ['de', de],
])('%s copy', (_locale, messages) => {
    it('calls the product source-available, never open source', () => {
        const offenders = leaves(messages)
            .filter(([path, text]) => OPEN_SOURCE.test(text) && !ALLOWED.includes(path))
            .map(([path]) => path);
        expect(offenders).toEqual([]);
    });

    it('keeps every allowed mention, so the list cannot rot', () => {
        expect(
            leaves(messages)
                .filter(([path, text]) => ALLOWED.includes(path) && OPEN_SOURCE.test(text))
                .map(([path]) => path)
                .sort(),
        ).toEqual(ALLOWED);
    });
});
