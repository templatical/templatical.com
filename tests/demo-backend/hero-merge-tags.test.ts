import { describe, expect, it } from 'vitest';
import { HERO_CONTENT } from '@/lib/demo-backend/hero-content';
import en from '@/i18n/locales/en';

const HERO_EDITOR = (
    import.meta.glob('../../src/components/HeroEditor.vue', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>
)['../../src/components/HeroEditor.vue'];

function objectLiteral(name: string): Record<string, string> {
    const start = HERO_EDITOR?.indexOf(`const ${name}`) ?? -1;
    const bodyStart = HERO_EDITOR?.indexOf('{', start) ?? -1;
    const bodyEnd = HERO_EDITOR?.indexOf('\n};', bodyStart) ?? -1;
    expect(bodyStart).toBeGreaterThan(-1);
    expect(bodyEnd).toBeGreaterThan(bodyStart);
    const body = HERO_EDITOR?.slice(bodyStart, bodyEnd) ?? '';
    const entries = [...body.matchAll(/(\w+):\s*'([^']*)'/g)];
    return Object.fromEntries(entries.map(([, key, value]) => [key, value ?? '']));
}

function mergeTagsIn(value: unknown, found: Set<string>): void {
    if (typeof value === 'string') {
        for (const match of value.matchAll(/\{\{[a-z0-9_]+\}\}/gi)) {
            const tag = match[0];
            if (tag) found.add(tag);
        }
        return;
    }
    if (Array.isArray(value)) {
        for (const item of value) mergeTagsIn(item, found);
        return;
    }
    if (value && typeof value === 'object') {
        for (const item of Object.values(value)) mergeTagsIn(item, found);
    }
}

describe('hero merge tags', () => {
    it('configures every tag the seed uses with a label and a sample', () => {
        const used = new Set<string>();
        mergeTagsIn(HERO_CONTENT, used);
        expect([...used].sort()).toEqual(['{{company}}', '{{first_name}}', '{{unsubscribe_url}}']);

        const values = objectLiteral('DEMO_TAG_VALUES');
        const samples = objectLiteral('DEMO_TAG_SAMPLES');
        expect(values).toEqual({
            firstName: '{{first_name}}',
            lastName: '{{last_name}}',
            email: '{{email}}',
            company: '{{company}}',
            unsubscribeUrl: '{{unsubscribe_url}}',
        });
        expect(samples).toEqual({
            firstName: 'Alex',
            lastName: 'Chen',
            email: 'alex@example.com',
            company: 'North Studio',
            unsubscribeUrl: 'https://example.com/unsubscribe',
        });

        const labels = en.heroEditor.mergeTags;
        for (const tag of used) {
            const key = Object.entries(values).find(([, value]) => value === tag)?.[0];
            expect(key, tag).toEqual(expect.any(String));
            const sample = samples[key ?? ''];
            expect(sample?.trim().length).toBeGreaterThan(0);
            const label = labels[key as keyof typeof labels]?.label;
            expect(label?.trim().length).toBeGreaterThan(0);
        }

        expect(HERO_EDITOR).toContain('sample: DEMO_TAG_SAMPLES[key]');
        expect(HERO_EDITOR).toContain('label: t(`heroEditor.mergeTags.${key}.label`)');
        expect(HERO_EDITOR).toContain('displayConditions:');
        expect(HERO_EDITOR).toContain('conditions: [{ ...HERO_FREE_PLAN_CONDITION }]');
    });
});
