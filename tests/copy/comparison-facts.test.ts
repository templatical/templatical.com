import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';

/*
    Competitor cells rechecked on 19 November 2026. These assertions pin the claims
    that pass replaced, and the verification date on every comparison footnote.
    The vendor list is the locale object, so a new page is covered without editing
    this array.
*/

type Vendor = {
    footnote: { verified: string };
    hero: { subheadline: string };
    table: { rows: Record<string, { them: string }> };
    bestFit: { us: Record<string, string>; them: Record<string, string> };
};

const enAlternatives = en.alternatives as Record<string, Vendor>;
const deAlternatives = de.alternatives as Record<string, Vendor>;
const vendors = Object.keys(enAlternatives);

const PRICING_CAVEAT_EN = 'Pricing and features change — check their site for current terms.';
const PRICING_CAVEAT_DE =
    'Preise und Funktionen ändern sich — aktuelle Konditionen finden Sie auf deren Website.';
const LANGUAGE_SENTENCE_EN = 'The language versions row was checked on';
const LANGUAGE_SENTENCE_DE = 'Die Zeile zu Sprachversionen wurde am';

describe('comparison facts rechecked on 19 November 2026', () => {
    it('uses the locale object for the vendor list, and German has the same vendors', () => {
        expect(vendors.length).toBeGreaterThan(0);
        expect(Object.keys(deAlternatives).sort()).toEqual([...vendors].sort());
    });

    it.each(vendors)(
        '%s footnote is dated 19 November 2026 and keeps the pricing caveat',
        (vendor) => {
            expect(enAlternatives[vendor].footnote.verified).toContain('19 November 2026');
            expect(enAlternatives[vendor].footnote.verified).toContain(PRICING_CAVEAT_EN);
            expect(enAlternatives[vendor].footnote.verified).not.toContain('3 November 2026');
            expect(deAlternatives[vendor].footnote.verified).toContain('19. November 2026');
            expect(deAlternatives[vendor].footnote.verified).toContain(PRICING_CAVEAT_DE);
            expect(deAlternatives[vendor].footnote.verified).not.toContain('3. November 2026');
        },
    );

    it('drops superseded claims and states the ruled replacements', () => {
        expect(enAlternatives.topol.table.rows.customBlocks.them).not.toBe(
            'Included on every plan',
        );
        expect(enAlternatives.topol.table.rows.customBlocks.them).toBe(
            'On the Business plan ($300/mo) and higher',
        );
        expect(deAlternatives.topol.table.rows.customBlocks.them).not.toBe(
            'In jedem Tarif enthalten',
        );
        expect(deAlternatives.topol.table.rows.customBlocks.them).toBe(
            'Im Business-Tarif (300 $/Monat) und höher',
        );

        expect(enAlternatives.beefree.table.rows.pricing.them).not.toContain('$6,000');
        expect(enAlternatives.beefree.table.rows.pricing.them).toBe(
            'Free tier, then Essentials $400, Core $1,200 or Superpowers $3,000 per month, plus Enterprise',
        );
        expect(deAlternatives.beefree.table.rows.pricing.them).not.toContain('6.000');
        expect(deAlternatives.beefree.table.rows.pricing.them).toBe(
            'Kostenlose Stufe, danach Essentials 400, Core 1.200 oder Superpowers 3.000 $ pro Monat, dazu Enterprise',
        );

        expect(enAlternatives.grapesjs.footnote.verified).not.toContain('quote-only');
        expect(deAlternatives.grapesjs.footnote.verified).not.toContain('nur auf Anfrage');

        expect(enAlternatives.unlayer.table.rows.domains.them).not.toContain(
            '1 domain on Free and Launch',
        );
        expect(enAlternatives.unlayer.table.rows.domains.them).toBe(
            '1 domain on Free, 2 on Launch, 3 on Scale and Optimize',
        );
        expect(deAlternatives.unlayer.table.rows.domains.them).not.toContain(
            '1 Domain in Free und Launch',
        );
        expect(deAlternatives.unlayer.table.rows.domains.them).toBe(
            '1 Domain in Free, 2 in Launch, 3 in Scale und Optimize',
        );

        expect(enAlternatives.easyEmailPro.table.rows.footprint.them).not.toContain('62 MB');
        expect(enAlternatives.easyEmailPro.table.rows.footprint.them).toBe(
            'About 65.7 MB unpacked across four packages',
        );
        expect(deAlternatives.easyEmailPro.table.rows.footprint.them).not.toContain('62 MB');
        expect(deAlternatives.easyEmailPro.table.rows.footprint.them).toBe(
            'Rund 65,7 MB entpackt über vier Pakete',
        );
    });

    it('keeps the homepage trade-off line in step with the Topol custom-blocks row', () => {
        expect(en.home.comparison.columns.hosted.tradeOffs).toContain(
            'Topol includes white-labelling on every plan and custom blocks from its Business plan.',
        );
        expect(de.home.comparison.columns.hosted.tradeOffs).toContain(
            'Topol enthält White-Labeling in jedem Tarif und Custom Blocks ab dem Business-Tarif.',
        );
        for (const line of [
            ...en.home.comparison.columns.hosted.tradeOffs,
            ...de.home.comparison.columns.hosted.tradeOffs,
        ]) {
            expect(line).not.toMatch(/custom blocks on every plan|Custom Blocks in jedem Tarif/i);
        }
    });

    it('drops the separate language-row sentence only where the ruling said to', () => {
        for (const vendor of ['grapesjs', 'chamaileon', 'easyEmailPro', 'unlayer']) {
            expect(enAlternatives[vendor].footnote.verified, vendor).not.toContain(
                LANGUAGE_SENTENCE_EN,
            );
            expect(deAlternatives[vendor].footnote.verified, vendor).not.toContain(
                LANGUAGE_SENTENCE_DE,
            );
        }
        for (const vendor of ['beefree', 'stripo', 'topol']) {
            expect(enAlternatives[vendor].footnote.verified, vendor).toContain(
                `${LANGUAGE_SENTENCE_EN} 19 November 2026`,
            );
            expect(deAlternatives[vendor].footnote.verified, vendor).toContain(
                `${LANGUAGE_SENTENCE_DE} 19. November 2026`,
            );
        }
    });
});
