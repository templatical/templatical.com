import { useColorMode, usePreferredDark, useStorage } from '@vueuse/core';
import { computed } from 'vue';

export type ThemeMode = 'auto' | 'light' | 'dark';

/*
    The stored choice is read and written here, not by useColorMode. Its own useStorage call
    passes only window and listenToStorageChanges as options, so a writeDefaults set on
    useColorMode never reaches it, and VueUse's default (on) stored `auto` on every first
    visit. Here the key is owned directly: a missing key stays missing (null) and reads as
    auto, the way index.html's pre-paint script reads it, and passing storageRef makes
    useColorMode use this ref instead of its own. Only light and dark are ever stored:
    choosing auto removes the key, and an `auto` left by the earlier default is removed on
    load (VueUse removes the item when the ref is set to null). The privacy notice says the
    theme is stored only once the visitor picks one.
*/
const picked = useStorage<ThemeMode | null>('templatical-theme', null, undefined, {
    writeDefaults: false,
});
if (picked.value === 'auto') picked.value = null;

const mode = useColorMode<ThemeMode>({
    emitAuto: true,
    modes: { auto: '', light: '', dark: 'dark' },
    storageRef: computed<ThemeMode>({
        get: () => picked.value ?? 'auto',
        set: (next) => {
            picked.value = next === 'auto' ? null : next;
        },
    }),
});

const preferredDark = usePreferredDark();
const isDark = computed(
    () => mode.value === 'dark' || (mode.value === 'auto' && preferredDark.value),
);

function setMode(next: ThemeMode) {
    mode.value = next;
}

function cycleMode() {
    mode.value = mode.value === 'auto' ? 'light' : mode.value === 'light' ? 'dark' : 'auto';
}

function toggle() {
    cycleMode();
}

export function useDarkMode() {
    return { isDark, mode, setMode, cycleMode, toggle };
}
