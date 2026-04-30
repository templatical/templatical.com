<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { URLS } from '@/lib/urls';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { Github } from 'lucide-vue-next';

const { t } = useI18n();
const { stars: count } = useGitHubStars();

function format(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

const ariaLabel = computed(() =>
    count.value !== null
        ? t('github.starActionWithCount', { count: format(count.value) })
        : t('github.starAction'),
);
</script>

<template>
    <a
        :href="URLS.github"
        rel="noopener noreferrer"
        target="_blank"
        :aria-label="ariaLabel"
        class="group inline-flex items-center overflow-hidden rounded-md text-xs/6 font-medium ring-1 ring-neutral-950/10 transition-colors hover:ring-neutral-950/20 dark:ring-white/10 dark:hover:ring-white/20"
    >
        <span
            aria-hidden="true"
            class="inline-flex items-center gap-1.5 bg-neutral-950/5 px-2.5 py-1 text-neutral-950 group-hover:bg-neutral-950/10 dark:bg-white/5 dark:text-white dark:group-hover:bg-white/10"
        >
            <Github class="size-3.5" />
            {{ t('github.star') }}
        </span>
        <span
            aria-hidden="true"
            class="inline-flex min-w-[2.25rem] justify-center px-2.5 py-1 tabular-nums text-neutral-700 dark:text-neutral-200"
        >
            <span :class="count === null && 'invisible'">{{ format(count ?? 0) }}</span>
        </span>
    </a>
</template>
