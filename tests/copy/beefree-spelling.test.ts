import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import deSource from '@/i18n/locales/de.ts?raw';
import enSource from '@/i18n/locales/en.ts?raw';
import { IMPORTERS } from '@/lib/importers';
import importersSource from '@/lib/importers.ts?raw';
import llms from '../../public/llms.txt?raw';

describe('Beefree spelling', () => {
    it('does not spell the vendor BeeFree in user-facing sources', () => {
        expect(enSource).not.toContain('BeeFree');
        expect(deSource).not.toContain('BeeFree');
        expect(importersSource).not.toContain('BeeFree');
        expect(llms).not.toContain('BeeFree');
    });

    it('uses the vendor spelling Beefree on the importer and the trademark line', () => {
        expect(IMPORTERS.find((importer) => importer.slug === 'beefree')?.name).toBe('Beefree');
        expect(en.alternatives.beefree.footnote.trademark).toBe(
            'Beefree and Beefree SDK are trademarks of their respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
        );
        expect(de.alternatives.beefree.footnote.trademark).toBe(
            'Beefree und Beefree SDK sind Marken des jeweiligen Inhabers. Diese Seite wird von Templatical gepflegt und steht weder in Verbindung mit dem Anbieter noch wird sie von ihm unterstützt.',
        );
    });
});
