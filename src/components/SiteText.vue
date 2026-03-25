<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

const props = withDefaults(
    defineProps<{
        size?: 'md' | 'lg';
    }>(),
    {
        size: 'md',
    },
);

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        props.size === 'md' && 'text-base/7',
        props.size === 'lg' && 'text-lg/8',
        'text-neutral-700 dark:text-neutral-400',
        attrs.class as string,
    ),
);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
