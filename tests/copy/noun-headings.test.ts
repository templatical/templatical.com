import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';

/** Every string leaf, so a retired slogan cannot survive under a different key. */
function leaves(value: unknown): string[] {
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value.flatMap(leaves);
    if (value !== null && typeof value === 'object') return Object.values(value).flatMap(leaves);
    return [];
}

const RETIRED = [
    'Ship an email editor this week',
    'The features other editors gate. In your repo. Free to embed.',
    'Everything else you expect — done right.',
    'Painless migration',
    'Diese Woche einen E-Mail-Editor ausliefern',
    'Was andere Editoren hinter Schranken halten — bei uns in Ihrem Repo. Kostenlos einbettbar.',
    'Alles andere, was Sie erwarten — richtig gemacht.',
    'Schmerzlose Migration',
];

describe('noun-phrase headings', () => {
    it('uses the installation, features, essentials and migration headings', () => {
        expect(en.home.close.headline).toBe('Installation: one npm install, one init() call');
        expect(de.home.close.headline).toBe('Installation: ein npm install, ein init()-Aufruf');
        expect(en.features.hero.headline).toBe('Email editor features in the MIT-licensed SDK');
        expect(de.features.hero.headline).toBe(
            'Funktionen des MIT-lizenzierten E-Mail-Editor-SDKs',
        );
        expect(en.features.supporting.headline).toBe('Integration and editing essentials');
        expect(de.features.supporting.headline).toBe('Grundlagen für Integration und Bearbeitung');
        expect(en.features.migration.eyebrow).toBe('Migration');
        expect(de.features.migration.eyebrow).toBe('Migration');
    });

    it('keeps the retired slogan headings out of both locales', () => {
        const text = [...leaves(en), ...leaves(de)];
        const stillPresent = RETIRED.filter((slogan) => text.some((line) => line.includes(slogan)));
        expect(stillPresent).toEqual([]);
    });
});
