import { describe, expect, it } from 'vitest';
import en from '@/i18n/locales/en';
import de from '@/i18n/locales/de';

/** Every leaf path in a nested message object, dot-joined, sorted. */
function keyPaths(value: unknown, prefix = ''): string[] {
    if (Array.isArray(value)) {
        // Arrays are message lists (feature bullets, badges). Their length is
        // part of the contract — a locale with fewer bullets renders fewer.
        return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
    }
    if (value !== null && typeof value === 'object') {
        return Object.entries(value).flatMap(([k, v]) =>
            keyPaths(v, prefix ? `${prefix}.${k}` : k),
        );
    }
    return [prefix];
}

describe('locale parity', () => {
    it('en and de expose an identical key tree', () => {
        const enKeys = keyPaths(en).sort();
        const deKeys = keyPaths(de).sort();

        const missingInDe = enKeys.filter((k) => !deKeys.includes(k));
        const missingInEn = deKeys.filter((k) => !enKeys.includes(k));

        expect({ missingInDe, missingInEn }).toEqual({
            missingInDe: [],
            missingInEn: [],
        });
    });
});
