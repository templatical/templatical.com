<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';
import { URLS } from '@/lib/urls';
import IconGitHub from './icons/IconGitHub.vue';

const { data } = useFetch('https://api.github.com/repos/templatical/sdk', {
    timeout: 1500,
}).get().json<{ stargazers_count?: number }>();

const count = computed(() =>
    typeof data.value?.stargazers_count === 'number' ? data.value.stargazers_count : null,
);

function format(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}
</script>

<template>
    <a
        :href="URLS.github"
        rel="noopener noreferrer"
        target="_blank"
        class="group inline-flex items-center overflow-hidden rounded-md text-xs/6 font-medium ring-1 ring-neutral-950/10 transition-colors hover:ring-neutral-950/20 dark:ring-white/10 dark:hover:ring-white/20"
    >
        <span
            class="inline-flex items-center gap-1.5 bg-neutral-950/5 px-2.5 py-1 text-neutral-950 group-hover:bg-neutral-950/10 dark:bg-white/5 dark:text-white dark:group-hover:bg-white/10"
        >
            <IconGitHub class="size-3.5" />
            Star
        </span>
        <span
            v-if="count !== null"
            class="bg-white px-2.5 py-1 tabular-nums text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
        >
            {{ format(count) }}
        </span>
    </a>
</template>
