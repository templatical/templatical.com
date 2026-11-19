import { describe, expect, it } from 'vitest';
import { createI18n } from 'vue-i18n';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { IMPORTER_COUNT } from '@/lib/importers';
import alternativePage from '../../src/components/AlternativePage.vue?raw';

const NUMBER_WORD = /\b(?:Eight|Acht)\b|\d/;

describe('Easy Email Pro importer row', () => {
    it('interpolates the importer count instead of a number word', () => {
        const enUs = en.alternatives.easyEmailPro.table.rows.importers.us;
        const deUs = de.alternatives.easyEmailPro.table.rows.importers.us;
        expect(enUs).toContain('{count}');
        expect(deUs).toContain('{count}');
        expect(enUs).not.toMatch(NUMBER_WORD);
        expect(deUs).not.toMatch(NUMBER_WORD);

        const i18n = createI18n({ legacy: false, locale: 'en', messages: { en, de } });
        expect(
            i18n.global.t('alternatives.easyEmailPro.table.rows.importers.us', {
                count: IMPORTER_COUNT,
            }),
        ).toBe(`${IMPORTER_COUNT} MIT converters, including one for Easy Email Pro templates`);
        i18n.global.locale.value = 'de';
        expect(
            i18n.global.t('alternatives.easyEmailPro.table.rows.importers.us', {
                count: IMPORTER_COUNT,
            }),
        ).toBe(`${IMPORTER_COUNT} MIT-Konverter, darunter einer für Easy-Email-Pro-Vorlagen`);
    });

    it('passes IMPORTER_COUNT only for the importers row', () => {
        expect(alternativePage).toContain("import { IMPORTER_COUNT } from '@/lib/importers'");
        expect(alternativePage).toContain(
            "key === 'importers'\n                ? t(k(`table.rows.${key}.us`), { count: IMPORTER_COUNT })\n                : t(k(`table.rows.${key}.us`))",
        );
    });
});
