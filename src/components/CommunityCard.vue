<script setup lang="ts">
import type { Component } from 'vue';
import IconChevronRight from './icons/IconChevronRight.vue';

defineProps<{
    title: string;
    description: string;
    href: string;
    cta: string;
    icon: Component;
}>();
</script>

<template>
    <a
        :href="href"
        rel="noopener noreferrer"
        class="group flex flex-col gap-6 rounded-xl bg-white p-8 shadow-sm ring-1 ring-neutral-950/5 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:ring-white/10"
    >
        <div
            class="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-[background-color,transform] duration-200 group-hover:bg-primary/15 motion-safe:group-hover:scale-105"
        >
            <component :is="icon" />
        </div>
        <div class="flex flex-col gap-2">
            <h3
                class="text-lg/8 font-medium text-neutral-950 dark:text-white"
            >
                {{ title }}
            </h3>
            <p class="text-sm/7 text-neutral-700 dark:text-neutral-400">
                {{ description }}
            </p>
        </div>
        <span
            class="inline-flex items-center gap-2 text-sm/7 font-medium text-primary"
        >
            {{ cta }}
            <IconChevronRight class="transition-transform group-hover:translate-x-0.5" />
        </span>
    </a>
</template>
