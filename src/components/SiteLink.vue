<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';

const props = withDefaults(
    defineProps<{
        href: string;
        external?: boolean;
    }>(),
    {
        external: false,
    },
);

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'inline-flex items-center gap-2 text-sm/7 font-medium text-neutral-950 transition-colors hover:text-primary dark:text-white dark:hover:text-primary',
        attrs.class as string,
    ),
);
</script>

<template>
    <a v-if="props.external" :href="href" rel="noopener noreferrer" :class="classes">
        <slot />
    </a>
    <router-link v-else :to="href" :class="classes">
        <slot />
    </router-link>
</template>
