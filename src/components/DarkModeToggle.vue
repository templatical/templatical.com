<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Monitor, Moon, Sun } from 'lucide-vue-next';

const { t } = useI18n();
const { mode, cycleMode } = useDarkMode();

const ariaLabel = computed(() => {
    // Label = action the click will perform (next mode in the cycle).
    if (mode.value === 'auto') return t('a11y.switchToLight');
    if (mode.value === 'light') return t('a11y.switchToDark');
    return t('a11y.switchToAuto');
});
</script>

<template>
    <button
        type="button"
        :aria-label="ariaLabel"
        :title="ariaLabel"
        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-400 dark:hover:text-white"
        @click="cycleMode()"
    >
        <Monitor v-if="mode === 'auto'" class="size-5" />
        <Sun v-else-if="mode === 'light'" class="size-5" />
        <Moon v-else class="size-5" />
    </button>
</template>
