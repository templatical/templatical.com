import { describe, expect, it } from 'vitest';
import { i18n } from '@/i18n';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { BROWSER_STORAGE, PRIVACY_SECTIONS } from '@/lib/legal';
import { legalRoutes, routes } from '@/router';

const LOCALES = { en, de } as const;
const PLACEHOLDERS = new Set(['email', 'name', 'date', 'link']);

/** Every string leaf under a node, with its dotted path. */
function leaves(node: unknown, path: string): [string, string][] {
    if (typeof node === 'string') return [[path, node]];
    if (Array.isArray(node)) return node.flatMap((item, i) => leaves(item, `${path}.${i}`));
    if (node && typeof node === 'object')
        return Object.entries(node).flatMap(([k, v]) => leaves(v, `${path}.${k}`));
    return [];
}

describe('the /privacy route', () => {
    it('is registered with no route meta: a plain document under the solid navbar', () => {
        const privacy = routes.find((route) => route.path === '/privacy');
        expect(privacy).toBeDefined();
        expect(privacy?.meta).toBeUndefined();
        expect(legalRoutes().map((route) => route.path)).toEqual(['/privacy']);
    });
});

describe.each(Object.entries(LOCALES))('privacy copy (%s)', (locale, messages) => {
    const { sections } = messages.privacy;

    it('has a title and at least one paragraph for every section', () => {
        for (const { key } of PRIVACY_SECTIONS) {
            expect(sections[key].title, key).not.toBe('');
            expect(sections[key].paragraphs.length, key).toBeGreaterThan(0);
        }
    });

    it('labels a policy link exactly where a section has one', () => {
        for (const section of PRIVACY_SECTIONS) {
            expect('policy' in sections[section.key], section.key).toBe(Boolean(section.policy));
        }
    });

    it('explains every stored entry, and nothing that is not stored', () => {
        expect(Object.keys(sections.storage.items).sort()).toEqual(
            BROWSER_STORAGE.map((entry) => entry.item).sort(),
        );
    });

    it('uses only the known placeholders, and no other vue-i18n syntax', () => {
        for (const [path, text] of leaves(messages.privacy, 'privacy')) {
            expect(text, path).not.toMatch(/\|/);
            expect(text, path).not.toMatch(/@/);
            for (const [, name] of text.matchAll(/\{([^}]*)\}/g))
                expect(PLACEHOLDERS.has(name), `${path}: {${name}}`).toBe(true);
        }
    });

    it('compiles every paragraph through the real message compiler', () => {
        i18n.global.locale.value = locale as 'en' | 'de';
        for (const { key } of PRIVACY_SECTIONS) {
            sections[key].paragraphs.forEach((_, index) => {
                const path = `privacy.sections.${key}.paragraphs.${index}`;
                const out = i18n.global.t(path, { email: 'E', name: 'N' });
                expect(out, path).not.toBe(path);
                expect(out, path).not.toMatch(/[{}]/);
            });
        }
        i18n.global.locale.value = 'en';
    });

    it('never claims the site has no analytics: it runs Cloudflare Web Analytics', () => {
        for (const [path, text] of leaves(messages.privacy, 'privacy'))
            expect(text, path).not.toMatch(
                /\bno analytics\b|without analytics|keine (Analytics|Statistik|Analyse)|ohne (Analytics|Statistik)|\bno tracking\b|kein Tracking/i,
            );
    });

    it('names the controller from LEGAL, not from a copy of the name', () => {
        expect(sections.controller.paragraphs.join(' ')).toContain('{name}');
        expect(sections.controller.paragraphs.join(' ')).not.toContain('Orkhan');
    });
});
