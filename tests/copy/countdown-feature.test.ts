import { expect, it } from 'vitest';
import { i18n } from '@/i18n';

it('renders the countdown feature description through vue-i18n in both languages', () => {
    for (const locale of ['en', 'de'] as const) {
        i18n.global.locale.value = locale;
        const text = i18n.global.t('features.countdown.description');
        expect(text).toContain('countdown.imageUrl in init()');
        expect(text).toMatch(
            locale === 'en' ? /ships no image server/ : /liefert keinen Bildserver/,
        );
    }
});
