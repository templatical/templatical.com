<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineProps<{
    className?: HTMLAttributes['class'];
}>();

defineOptions({ inheritAttrs: false });
</script>

<template>
    <img
        src="/logo.svg"
        alt="Templatical"
        width="36"
        height="36"
        :class="className"
        v-bind="$attrs"
    />
</template>
