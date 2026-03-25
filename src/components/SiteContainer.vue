<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10',
        attrs.class as string,
    ),
);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
