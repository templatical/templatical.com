<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn('text-sm/7 font-semibold text-primary', attrs.class as string),
);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
