<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowUpRight, Code, RotateCcw } from '@lucide/vue';
import { localizedUrl } from '@/lib/urls';

defineProps<{ resetting: boolean; mjmlOpen: boolean }>();
defineEmits<{ reset: []; toggleMjml: [] }>();

const { t, locale } = useI18n();

/**
 * The five keys actually passed to init(). `render` is deliberately absent:
 * toMjml() falls back to the bundled renderer, so naming it here would claim a
 * provider this demo does not configure.
 */
const CONFIG_KEYS = [
    'templates',
    'versionHistory',
    'comments',
    'savedBlocks',
    'testEmail',
] as const;

const backendDocsUrl = computed(() => localizedUrl('backendDocs', locale.value));
</script>

<template>
    <div class="mt-4 flex flex-col gap-3 rounded-lg border border-neutral-950/5 bg-white/60 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5">
        <div class="flex flex-col gap-2">
            <ul :aria-label="t('heroEditor.demo.chipsLabel')" class="flex flex-wrap items-center gap-1.5">
                <li v-for="key in CONFIG_KEYS" :key="key">
                    <code class="rounded-full bg-white/70 px-2 py-0.5 font-mono text-[11px] text-neutral-700 ring-1 ring-neutral-950/5 dark:bg-white/10 dark:text-neutral-300 dark:ring-white/10">
                        {{ key }}
                    </code>
                </li>
            </ul>
            <p class="max-w-2xl text-xs/5 text-pretty text-neutral-600 dark:text-neutral-400">
                {{ t('heroEditor.demo.description') }}
                <a
                    :href="backendDocsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ml-1 inline-flex items-center gap-0.5 font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    {{ t('heroEditor.demo.docsLink') }}
                    <ArrowUpRight class="size-3" aria-hidden="true" />
                </a>
            </p>
        </div>

        <div class="flex shrink-0 items-center gap-2">
            <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-neutral-300 dark:hover:bg-neutral-800"
                :aria-expanded="mjmlOpen"
                @click="$emit('toggleMjml')"
            >
                <Code class="size-3.5" aria-hidden="true" />
                {{ mjmlOpen ? t('heroEditor.mjml.hide') : t('heroEditor.mjml.show') }}
            </button>
            <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-neutral-300 dark:hover:bg-neutral-800"
                :disabled="resetting"
                @click="$emit('reset')"
            >
                <RotateCcw class="size-3.5" aria-hidden="true" />
                {{ resetting ? t('heroEditor.demo.resetting') : t('heroEditor.demo.reset') }}
            </button>
        </div>
    </div>
</template>
