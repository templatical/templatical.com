<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps<{
    items: Array<{
        question: string;
        answer: string;
    }>;
}>();

const uid = useId();
const entries = computed(() =>
    props.items.map((item, index) => ({
        ...item,
        key: item.question,
        buttonId: `${uid}-faq-button-${index}`,
        panelId: `${uid}-faq-panel-${index}`,
    })),
);

const openKey = ref<string | null>(null);

function toggle(key: string) {
    openKey.value = openKey.value === key ? null : key;
}
</script>

<template>
    <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="entry in entries" :key="entry.key">
            <button
                :id="entry.buttonId"
                type="button"
                class="flex w-full cursor-pointer items-center justify-between py-5 text-left transition-colors hover:text-primary"
                :aria-expanded="openKey === entry.key"
                :aria-controls="entry.panelId"
                @click="toggle(entry.key)"
            >
                <span
                    class="text-base/7 font-medium text-neutral-950 dark:text-white"
                >
                    {{ entry.question }}
                </span>
                <ChevronDown
                    :class="[
                        'size-5 shrink-0 text-neutral-500 transition-transform duration-200 motion-reduce:transition-none',
                        openKey === entry.key ? 'rotate-180' : '',
                    ]"
                    aria-hidden="true"
                />
            </button>
            <div
                :id="entry.panelId"
                role="region"
                :aria-labelledby="entry.buttonId"
                :inert="openKey !== entry.key ? '' : undefined"
                :class="[
                    'grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none',
                    openKey === entry.key
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                ]"
            >
                <div class="overflow-hidden">
                    <p class="pb-5 text-sm/7 text-neutral-700 dark:text-neutral-300">
                        {{ entry.answer }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
