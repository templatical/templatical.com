import { createI18n } from 'vue-i18n';
import de from './locales/de';
import en from './locales/en';

export type MessageSchema = typeof en;

export const i18n = createI18n<[MessageSchema], 'en' | 'de'>({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        de,
    },
});
