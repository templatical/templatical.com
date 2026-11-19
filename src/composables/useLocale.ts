import { i18n } from '@/i18n';
import { computed } from 'vue';

const STORAGE_KEY = 'templatical-locale';
const SUPPORTED_LOCALES = ['en', 'de'] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupported(locale: string): locale is SupportedLocale {
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

function getPreferredLocale(): SupportedLocale {
    let stored: string | null = null;
    try {
        stored = localStorage.getItem(STORAGE_KEY);
    } catch {
        // Storage can be unavailable; use the browser language instead.
    }
    if (stored && isSupported(stored)) {
        return stored;
    }

    const browserLang = navigator.language.split('-')[0];
    if (isSupported(browserLang)) {
        return browserLang;
    }

    return 'en';
}

function setLocale(value: SupportedLocale) {
    i18n.global.locale.value = value;
    if (typeof document !== 'undefined') {
        document.documentElement.lang = value;
    }
}

setLocale('en');

// Prerendered HTML is English, so apply the preference after hydration; doing so at import time causes a mismatch.
export function applyPreferredLocale() {
    if (typeof window === 'undefined') {
        return;
    }

    setLocale(getPreferredLocale());
}

export function useLocale() {
    const locale = computed({
        get: () => i18n.global.locale.value as SupportedLocale,
        set: (value: SupportedLocale) => {
            setLocale(value);
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem(STORAGE_KEY, value);
                } catch {
                    // The language switch still works when storage is unavailable.
                }
            }
        },
    });

    function toggle() {
        locale.value = locale.value === 'en' ? 'de' : 'en';
    }

    return { locale, toggle, supportedLocales: SUPPORTED_LOCALES };
}
