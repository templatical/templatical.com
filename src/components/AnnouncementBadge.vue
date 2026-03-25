<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const props = withDefaults(
    defineProps<{
        text: string;
        href: string;
        external?: boolean;
        cta: string;
    }>(),
    {
        external: false,
    },
);

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'group relative inline-flex max-w-full gap-x-3 overflow-hidden rounded-md px-3.5 py-2 text-sm/6 max-sm:flex-col sm:items-center sm:rounded-full sm:px-3 sm:py-0.5',
        'bg-neutral-950/5 text-neutral-950 hover:bg-neutral-950/10 dark:bg-white/5 dark:text-white dark:inset-ring-1 dark:inset-ring-white/5 dark:hover:bg-white/10',
        attrs.class as string,
    ),
);
</script>

<template>
    <a v-if="props.external" :href="props.href" rel="noopener noreferrer" :class="classes">
        <span class="text-pretty sm:truncate">{{ props.text }}</span>
        <span
            class="h-3 w-px bg-neutral-950/20 max-sm:hidden dark:bg-white/10"
        />
        <span
            class="inline-flex shrink-0 items-center gap-2 font-semibold text-primary"
        >
            {{ props.cta }}
            <IconChevronRight class="shrink-0" />
        </span>
    </a>
    <router-link v-else :to="props.href" :class="classes">
        <span class="text-pretty sm:truncate">{{ props.text }}</span>
        <span
            class="h-3 w-px bg-neutral-950/20 max-sm:hidden dark:bg-white/10"
        />
        <span
            class="inline-flex shrink-0 items-center gap-2 font-semibold text-primary"
        >
            {{ props.cta }}
            <IconChevronRight class="shrink-0" />
        </span>
    </router-link>
</template>
