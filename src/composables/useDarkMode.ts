import { useDark, useToggle } from '@vueuse/core';

export function useDarkMode() {
    const isDark = useDark({
        storageKey: 'templatical-theme',
        valueDark: 'dark',
        valueLight: 'light',
    });
    const toggle = useToggle(isDark);
    return { isDark, toggle };
}
