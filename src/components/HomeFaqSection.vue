<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';

const { t, tm } = useI18n();

const uid = useId();
const entries = computed(() => {
    const items = tm('home.homeFaq.items') as { question: string; answer: string }[];
    return items.map((item, index) => ({
        ...item,
        key: index,
        buttonId: `${uid}-home-faq-button-${index}`,
        panelId: `${uid}-home-faq-panel-${index}`,
    }));
});

const openKey = ref<number | null>(0);

function toggle(key: number) {
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
                        :aria-hidden="openKey !== entry.key"
                        :class="[
                            'grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none',
                            openKey === entry.key
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0',
                        ]"
                    >
                        <div class="overflow-hidden">
                            <p
                                class="pb-5 text-sm/7 text-neutral-700 dark:text-neutral-300"
                            >
                                {{ entry.answer }}
                            </p>
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
                    <ChevronRight class="size-4" />
                </router-link>
            </div>
        </SiteContainer>
    </section>
</template>
