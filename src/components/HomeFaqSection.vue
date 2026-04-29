<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { useI18n } from 'vue-i18n';
import IconChevronRight from './icons/IconChevronRight.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';

const { t, tm } = useI18n();

const uid = useId();
const entries = computed(() => {
    const items = tm('home.homeFaq.items') as { question: string; answer: string }[];
    return items.map((item, index) => ({
        ...item,
        key: item.question,
        buttonId: `${uid}-home-faq-button-${index}`,
        panelId: `${uid}-home-faq-panel-${index}`,
    }));
});

const openKey = ref<string | null>(entries.value[0]?.key ?? null);

function toggle(key: string) {
    openKey.value = openKey.value === key ? null : key;
}
</script>

<template>
    <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
        <SiteContainer class="flex flex-col gap-10 sm:gap-14">
            <div class="mx-auto flex max-w-2xl flex-col gap-3 text-center">
                <SiteEyebrow>{{ t('home.homeFaq.eyebrow') }}</SiteEyebrow>
                <SiteSubheading>{{ t('home.homeFaq.headline') }}</SiteSubheading>
            </div>

            <div class="mx-auto w-full max-w-3xl divide-y divide-neutral-200 dark:divide-neutral-800">
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
                            v-html="entry.question"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            :class="[
                                'size-5 shrink-0 text-neutral-500 transition-transform duration-200',
                                openKey === entry.key ? 'rotate-180' : '',
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
                        :id="entry.panelId"
                        role="region"
                        :aria-labelledby="entry.buttonId"
                        :aria-hidden="openKey !== entry.key"
                        :class="[
                            'grid transition-all duration-200',
                            openKey === entry.key
                                ? 'grid-rows-[1fr] pb-5 opacity-100'
                                : 'grid-rows-[0fr] opacity-0',
                        ]"
                    >
                        <div class="overflow-hidden">
                            <p
                                class="text-sm/7 text-neutral-700 dark:text-neutral-400"
                                v-html="entry.answer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <router-link
                    to="/faq"
                    class="inline-flex items-center gap-1 text-sm/6 font-medium text-primary hover:underline"
                >
                    {{ t('home.homeFaq.seeAll') }}
                    <IconChevronRight class="size-4" />
                </router-link>
            </div>
        </SiteContainer>
    </section>
</template>
