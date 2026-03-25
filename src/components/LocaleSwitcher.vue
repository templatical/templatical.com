<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { locale, toggle } = useLocale();
</script>

<template>
    <button
        type="button"
        :aria-label="t('a11y.switchToLanguage', { language: locale === 'en' ? 'Deutsch' : 'English' })"
        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-xs font-medium uppercase text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-400 dark:hover:text-white"
        @click="toggle"
    >
        {{ locale }}
    </button>
</template>
