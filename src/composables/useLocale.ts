import { i18n } from '@/i18n';
import { computed } from 'vue';

const STORAGE_KEY = 'templatical-locale';
const SUPPORTED_LOCALES = ['en', 'de'] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupported(locale: string): locale is SupportedLocale {
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

function getInitialLocale(): SupportedLocale {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) {
        return stored;
    }

    const browserLang = navigator.language.split('-')[0];
    if (isSupported(browserLang)) {
        return browserLang;
    }

    return 'en';
}

const initialLocale = getInitialLocale();
i18n.global.locale.value = initialLocale;
if (typeof document !== 'undefined') {
    document.documentElement.lang = initialLocale;
}

export function useLocale() {
    const locale = computed({
        get: () => i18n.global.locale.value as SupportedLocale,
        set: (value: SupportedLocale) => {
            i18n.global.locale.value = value;
            localStorage.setItem(STORAGE_KEY, value);
            if (typeof document !== 'undefined') {
                document.documentElement.lang = value;
            }
        },
    });

    function toggle() {
        locale.value = locale.value === 'en' ? 'de' : 'en';
    }

    return { locale, toggle, supportedLocales: SUPPORTED_LOCALES };
}
