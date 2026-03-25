<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
import { useI18n } from 'vue-i18n';
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';

const { t } = useI18n();
const { isDark, toggle } = useDarkMode();
</script>

<template>
    <button
        type="button"
        :aria-label="isDark ? t('a11y.switchToLight') : t('a11y.switchToDark')"
        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-400 dark:hover:text-white"
        @click="toggle"
    >
        <IconMoon v-if="isDark" />
        <IconSun v-else />
    </button>
</template>
