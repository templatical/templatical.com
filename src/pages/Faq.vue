<script setup lang="ts">
import FaqSection from '@/components/FaqSection.vue';
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteText from '@/components/SiteText.vue';
import { URLS } from '@/lib/urls';
import { ChevronRight } from 'lucide-vue-next';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead({
    title: computed(() => t('faq.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('faq.meta.description')),
        },
    ],
});

const faqItems = computed(() =>
    [
        'free',
        'commercial',
        'packages',
        'branding',
        'frameworks',
        'migrate',
        'data',
        'paid',
    ].map((key) => ({
        question: t(`faq.items.${key}.question`),
        answer: t(`faq.items.${key}.answer`),
    })),
);
</script>

<template>
    <div>
        <section
            class="relative -mt-21 bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950"
        >
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>
                            {{ t('faq.hero.eyebrow') }}
                        </SiteEyebrow>
                        <HeroHeadline
                            :text="t('faq.hero.headline')"
                            as="h1"
                        />
                    </div>
                    <SiteText class="text-pretty">
                        <p>{{ t('faq.hero.subheadline') }}</p>
                    </SiteText>
                </div>
            </SiteContainer>
        </section>

        <section class="bg-white py-16 sm:py-20 dark:bg-neutral-950">
            <SiteContainer>
                <div class="mx-auto max-w-3xl">
                    <FaqSection :items="faqItems" />
                </div>
            </SiteContainer>
        </section>

        <section class="bg-white py-16 sm:py-24 dark:bg-neutral-950">
            <SiteContainer>
                <div
                    class="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t('faq.stillAsking.eyebrow') }}</SiteEyebrow>
                        <h2
                            class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 sm:text-3xl/10 dark:text-white"
                        >
                            {{ t('faq.stillAsking.headline') }}
                        </h2>
                        <p class="max-w-xl text-base/7 text-neutral-700 dark:text-neutral-400">
                            {{ t('faq.stillAsking.description') }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-3 sm:shrink-0 sm:items-end">
                        <a
                            :href="URLS.discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                        >
                            {{ t('faq.stillAsking.discussionsCta') }}
                            <ChevronRight class="size-4" />
                        </a>
                        <a
                            :href="URLS.docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-sm/7 font-medium text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-300 dark:hover:text-white"
                        >
                            {{ t('faq.stillAsking.docsCta') }}
                            <ChevronRight class="size-4" />
                        </a>
                    </div>
                </div>
            </SiteContainer>
        </section>
    </div>
</template>
