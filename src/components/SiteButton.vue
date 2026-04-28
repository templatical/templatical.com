<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

const props = withDefaults(
    defineProps<{
        href?: string;
        external?: boolean;
        variant?: 'solid' | 'soft' | 'plain';
        color?: 'dark/light' | 'white';
        size?: 'md' | 'lg';
        type?: 'button' | 'submit';
    }>(),
    {
        href: undefined,
        external: false,
        variant: 'solid',
        color: 'dark/light',
        size: 'md',
        type: 'button',
    },
);

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const sizeClasses: Record<string, string> = {
    md: 'min-h-11 px-3.5 py-1.5',
    lg: 'min-h-11 px-4 py-2',
};

const classes = computed(() =>
    cn(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium transition-[color,background-color,box-shadow,transform] duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]',
        props.variant === 'solid' &&
            props.color === 'dark/light' &&
            'bg-primary text-primary-foreground hover:bg-primary/90',
        props.variant === 'solid' &&
            props.color === 'white' &&
            'bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-100 dark:hover:bg-white',
        props.variant === 'soft' &&
            'bg-primary/10 text-primary hover:bg-primary/15 dark:hover:bg-primary/20',
        props.variant === 'plain' &&
            props.color === 'dark/light' &&
            'text-neutral-950 hover:bg-neutral-950/10 dark:text-white dark:hover:bg-white/10',
        props.variant === 'plain' &&
            props.color === 'white' &&
            'text-white hover:bg-white/15 dark:hover:bg-white/10',
        sizeClasses[props.size],
        attrs.class as string,
    ),
);

const isLink = computed(() => !!props.href);
</script>

<template>
    <a v-if="isLink && external" :href="href!" rel="noopener noreferrer" :class="classes">
        <slot />
    </a>
    <router-link v-else-if="isLink" :to="href!" :class="classes">
        <slot />
    </router-link>
    <button v-else :type="type" :class="classes">
        <slot />
    </button>
</template>
