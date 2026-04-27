<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal';
import { useI18n } from 'vue-i18n';

defineProps<{
    rows: Array<{
        feature: string;
        templatical: string | boolean;
        beefree: string | boolean;
        highlight?: boolean;
    }>;
}>();

const { t } = useI18n();
const { sectionRef, isVisible } = useScrollReveal();
</script>

<template>
    <div
        ref="sectionRef"
        :class="[
            'overflow-x-auto rounded-xl ring-1 ring-neutral-950/5 dark:ring-white/10',
            isVisible
                ? 'motion-safe:animate-scroll-reveal'
                : 'motion-safe:opacity-0',
        ]"
    >
        <table class="w-full min-w-[420px] text-left text-sm">
            <thead>
                <tr class="bg-neutral-50 dark:bg-neutral-900">
                    <th
                        class="px-4 py-4 sm:px-6 font-medium text-neutral-950 dark:text-white"
                    >
                        {{ t('home.comparison.featureColumn') }}
                    </th>
                    <th
                        class="px-4 py-4 sm:px-6 font-medium text-primary"
                    >
                        Templatical
                    </th>
                    <th
                        class="px-4 py-4 sm:px-6 font-medium text-neutral-600 dark:text-neutral-400"
                    >
                        BeeFree
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr
                    v-for="row in rows"
                    :key="row.feature"
                    :class="[
                        row.highlight
                            ? 'bg-primary/5 dark:bg-primary/10'
                            : 'bg-white dark:bg-neutral-950',
                    ]"
                >
                    <td
                        class="px-4 py-4 sm:px-6 text-neutral-950 dark:text-white"
                        :class="{ 'font-medium': row.highlight }"
                    >
                        {{ row.feature }}
                    </td>
                    <td class="px-4 py-4 sm:px-6">
                        <svg
                            v-if="row.templatical === true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-5 text-primary"
                            role="img"
                            :aria-label="t('a11y.yes')"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                        <svg
                            v-else-if="row.templatical === false"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-5 text-neutral-300 dark:text-neutral-600"
                            role="img"
                            :aria-label="t('a11y.no')"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                        <span
                            v-else
                            class="text-neutral-700 dark:text-neutral-300"
                        >
                            {{ row.templatical }}
                        </span>
                    </td>
                    <td class="px-4 py-4 sm:px-6">
                        <svg
                            v-if="row.beefree === true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-5 text-neutral-600 dark:text-neutral-400"
                            role="img"
                            :aria-label="t('a11y.yes')"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                        <svg
                            v-else-if="row.beefree === false"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-5 text-neutral-300 dark:text-neutral-600"
                            role="img"
                            :aria-label="t('a11y.no')"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                        <span
                            v-else
                            class="text-neutral-600 dark:text-neutral-400"
                        >
                            {{ row.beefree }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
