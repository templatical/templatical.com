import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
    storageKey: 'templatical-theme',
    valueDark: 'dark',
    valueLight: '',
});
const toggle = useToggle(isDark);

export function useDarkMode() {
    return { isDark, toggle };
}
