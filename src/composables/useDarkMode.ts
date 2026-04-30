import { useColorMode, usePreferredDark } from '@vueuse/core';
import { computed } from 'vue';

export type ThemeMode = 'auto' | 'light' | 'dark';

const mode = useColorMode<ThemeMode>({
    storageKey: 'templatical-theme',
    initialValue: 'auto',
    emitAuto: true,
    modes: { auto: '', light: '', dark: 'dark' },
});

const preferredDark = usePreferredDark();
const isDark = computed(
    () => mode.value === 'dark' || (mode.value === 'auto' && preferredDark.value),
);

function setMode(next: ThemeMode) {
    mode.value = next;
}

function cycleMode() {
    mode.value =
        mode.value === 'auto' ? 'light' : mode.value === 'light' ? 'dark' : 'auto';
}

function toggle() {
    cycleMode();
}

export function useDarkMode() {
    return { isDark, mode, setMode, cycleMode, toggle };
}
