<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'font-display text-5xl/12 tracking-tight text-balance text-neutral-950 sm:text-[5rem]/20 dark:text-white',
        attrs.class as string,
    ),
);
</script>

<template>
    <h1 :class="classes">
        <slot />
    </h1>
</template>
