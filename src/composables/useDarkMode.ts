import { ref, watch } from 'vue';

const STORAGE_KEY = 'templatical-theme';

function getInitialMode(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return stored === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const isDark = ref(getInitialMode());

function apply(dark: boolean) {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.toggle('dark', dark);
}

apply(isDark.value);

watch(isDark, (dark) => {
    apply(dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
});

export function useDarkMode() {
    function toggle() {
        isDark.value = !isDark.value;
    }

    return { isDark, toggle };
}
