<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'font-display text-[2rem]/10 tracking-tight text-pretty text-neutral-950 sm:text-5xl/14 dark:text-white',
        attrs.class as string,
    ),
);
</script>

<template>
    <h2 :class="classes">
        <slot />
    </h2>
</template>
