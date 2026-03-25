<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineProps<{
    className?: HTMLAttributes['class'];
}>();

defineOptions({ inheritAttrs: false });
</script>

<template>
    <img src="/logo.svg" alt="Templatical" :class="className" v-bind="$attrs" />
</template>
