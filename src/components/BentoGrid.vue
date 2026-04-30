<script setup lang="ts">
import type { Component } from 'vue';
import { useScrollReveal } from '@/composables/useScrollReveal';

defineProps<{
    items: Array<{
        key: string;
        title: string;
        description: string;
        icon: Component;
    }>;
}>();

const { sectionRef, isVisible, shouldHide } = useScrollReveal();
</script>

<template>
    <div
        ref="sectionRef"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
        <div
            v-for="item in items"
            :key="item.key"
            :class="[
                'flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-white/10',
                isVisible && 'motion-safe:animate-scroll-reveal',
                shouldHide && 'motion-safe:opacity-0',
            ]"
        >
            <div
                class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
            >
                <component :is="item.icon" class="size-5" />
            </div>
            <div class="flex flex-col gap-2">
                <h3
                    class="text-base/8 font-medium text-neutral-950 dark:text-white"
                >
                    {{ item.title }}
                </h3>
                <p
                    class="text-sm/7 text-neutral-700 dark:text-neutral-400"
                >
                    {{ item.description }}
                </p>
            </div>
        </div>
    </div>
</template>
