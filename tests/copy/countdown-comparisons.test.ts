import { describe, expect, it } from 'vitest';
import en from '@/i18n/locales/en';
import de from '@/i18n/locales/de';

const pages = import.meta.glob('../../src/pages/Alternative*.vue', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;
const sourceKeys = {
    unlayer: 'unlayerTimerDocs',
    stripo: 'stripoTimerDocs',
    beefree: 'beefreePartnerAddonsDocs',
    chamaileon: 'chamaileonTimerDocs',
} as const;

describe('countdown comparison rows', () => {
    it.each(['unlayer', 'stripo', 'beefree', 'chamaileon'] as const)(
        'dates and sources the %s row in both languages',
        (vendor) => {
            const page =
                pages[
                    `../../src/pages/Alternative${vendor[0].toUpperCase()}${vendor.slice(1)}.vue`
                ];
            expect(page).toContain("'countdown'");
            expect(page).toContain(`URLS.${sourceKeys[vendor]}`);
            for (const locale of [en, de]) {
                const comparison = locale.alternatives[vendor];
                expect(comparison.table.rows.countdown.us).toBeTruthy();
                expect(comparison.table.rows.countdown.them).toBeTruthy();
                expect(comparison.footnote.verified).toContain('24');
                expect(comparison.footnote.verified).toContain('2026');
            }
        },
    );

    it.each(['Topol', 'EasyEmailPro', 'Grapesjs'])(
        'does not add an unverified row to %s',
        (vendor) => {
            expect(pages[`../../src/pages/Alternative${vendor}.vue`]).not.toContain("'countdown'");
        },
    );
});
