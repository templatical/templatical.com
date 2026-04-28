<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal';

const { sectionRef, isVisible } = useScrollReveal(0, '0px 0px -10% 0px');
</script>

<template>
    <div
        ref="sectionRef"
        :class="isVisible ? 'motion-safe:animate-scroll-reveal' : 'motion-safe:opacity-0'"
    >
        <slot />
    </div>
</template>
