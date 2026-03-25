<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    items: Array<{
        question: string;
        answer: string;
    }>;
}>();

const openIndex = ref<number | null>(null);

function toggle(index: number) {
    openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
    <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="(item, index) in items" :key="index">
            <button
                :id="`faq-button-${index}`"
                type="button"
                class="flex w-full cursor-pointer items-center justify-between py-5 text-left transition-colors hover:text-primary"
                :aria-expanded="openIndex === index"
                :aria-controls="`faq-panel-${index}`"
                @click="toggle(index)"
            >
                <span
                    class="text-base/7 font-medium text-neutral-950 dark:text-white"
                >
                    {{ item.question }}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    :class="[
                        'size-5 shrink-0 text-neutral-500 transition-transform duration-200',
                        openIndex === index ? 'rotate-180' : '',
                    ]"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </button>
            <div
                :id="`faq-panel-${index}`"
                role="region"
                :aria-labelledby="`faq-button-${index}`"
                :aria-hidden="openIndex !== index"
                :class="[
                    'grid transition-all duration-200',
                    openIndex === index
                        ? 'grid-rows-[1fr] pb-5 opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                ]"
            >
                <div class="overflow-hidden">
                    <p class="text-sm/7 text-neutral-700 dark:text-neutral-400">
                        {{ item.answer }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
