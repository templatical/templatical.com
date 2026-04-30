<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { useGitHubStars } from '@/composables/useGitHubStars';
import { Github } from 'lucide-vue-next';

const { stars: count } = useGitHubStars();

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
            <Github class="size-3.5" />
            Star
        </span>
        <span
            class="inline-flex min-w-[2.25rem] justify-center px-2.5 py-1 tabular-nums text-neutral-700 dark:text-neutral-200"
            :aria-label="count !== null ? `${count} stars on GitHub` : 'Loading GitHub star count'"
        >
            <span :class="count === null && 'invisible'">{{ format(count ?? 0) }}</span>
        </span>
    </a>
</template>
