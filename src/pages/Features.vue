<script setup lang="ts">
import BentoGrid from '@/components/BentoGrid.vue';
import CtaSection from '@/components/CtaSection.vue';
import FaqSection from '@/components/FaqSection.vue';
import SiteSection from '@/components/SiteSection.vue';
import IconArrowDownTray from '@/components/icons/IconArrowDownTray.vue';
import IconArrowUpTray from '@/components/icons/IconArrowUpTray.vue';
import IconArrowUturnLeft from '@/components/icons/IconArrowUturnLeft.vue';
import IconGlobe from '@/components/icons/IconGlobe.vue';
import IconMoon from '@/components/icons/IconMoon.vue';
import IconSwatch from '@/components/icons/IconSwatch.vue';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

useHead({
    title: computed(() => t('features.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('features.meta.description')),
        },
    ],
});

interface FeatureSection {
    eyebrow: string;
    title: string;
    description: string;
    features: string[];
    bg: 'white' | 'gray';
}

const featureSections = computed<FeatureSection[]>(() => [
    {
        eyebrow: t('features.customBlocks.eyebrow'),
        title: t('features.customBlocks.title'),
        description: t('features.customBlocks.description'),
        features: tm('features.customBlocks.features') as string[],
        bg: 'gray',
    },
    {
        eyebrow: t('features.mergeTags.eyebrow'),
        title: t('features.mergeTags.title'),
        description: t('features.mergeTags.description'),
        features: tm('features.mergeTags.features') as string[],
        bg: 'white',
    },
    {
        eyebrow: t('features.displayConditions.eyebrow'),
        title: t('features.displayConditions.title'),
        description: t('features.displayConditions.description'),
        features: tm('features.displayConditions.features') as string[],
        bg: 'gray',
    },
    {
        eyebrow: t('features.theming.eyebrow'),
        title: t('features.theming.title'),
        description: t('features.theming.description'),
        features: tm('features.theming.features') as string[],
        bg: 'white',
    },
    {
        eyebrow: t('features.defaults.eyebrow'),
        title: t('features.defaults.title'),
        description: t('features.defaults.description'),
        features: tm('features.defaults.features') as string[],
        bg: 'gray',
    },
]);

const supportingItems = computed(() => [
    {
        key: 'framework',
        icon: IconGlobe,
        title: t('features.supportingItems.framework.title'),
        description: t('features.supportingItems.framework.description'),
    },
    {
        key: 'output',
        icon: IconArrowUpTray,
        title: t('features.supportingItems.output.title'),
        description: t('features.supportingItems.output.description'),
    },
    {
        key: 'darkMode',
        icon: IconMoon,
        title: t('features.supportingItems.darkMode.title'),
        description: t('features.supportingItems.darkMode.description'),
    },
    {
        key: 'i18n',
        icon: IconGlobe,
        title: t('features.supportingItems.i18n.title'),
        description: t('features.supportingItems.i18n.description'),
    },
    {
        key: 'undoRedo',
        icon: IconArrowUturnLeft,
        title: t('features.supportingItems.undoRedo.title'),
        description: t('features.supportingItems.undoRedo.description'),
    },
    {
        key: 'responsivePreview',
        icon: IconSwatch,
        title: t('features.supportingItems.responsivePreview.title'),
        description: t('features.supportingItems.responsivePreview.description'),
    },
    {
        key: 'beefreeImport',
        icon: IconArrowDownTray,
        title: t('features.supportingItems.beefreeImport.title'),
        description: t('features.supportingItems.beefreeImport.description'),
    },
]);

const faqItems = computed(() => [
    {
        question: t('features.faq.items.free.question'),
        answer: t('features.faq.items.free.answer'),
    },
    {
        question: t('features.faq.items.commercial.question'),
        answer: t('features.faq.items.commercial.answer'),
    },
    {
        question: t('features.faq.items.beefree.question'),
        answer: t('features.faq.items.beefree.answer'),
    },
    {
        question: t('features.faq.items.frameworks.question'),
        answer: t('features.faq.items.frameworks.answer'),
    },
    {
        question: t('features.faq.items.migrate.question'),
        answer: t('features.faq.items.migrate.answer'),
    },
    {
        question: t('features.faq.items.paid.question'),
        answer: t('features.faq.items.paid.answer'),
    },
]);
</script>

<template>
    <div class="relative isolate overflow-hidden">
        <div
            aria-hidden="true"
            class="section-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]"
        />

        <SiteSection
            :eyebrow="t('features.hero.eyebrow')"
            :headline="t('features.hero.headline')"
            :subheadline="t('features.hero.subheadline')"
            headline-as="h1"
            class="!bg-transparent !py-14 sm:!py-20"
        />

        <section class="bg-white py-14 sm:py-20 dark:bg-neutral-950">
            <div
                class="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10"
            >
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <article
                        v-for="(section, index) in featureSections"
                        :key="index"
                        class="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-white/10"
                    >
                        <div class="text-xs/6 font-semibold tracking-wide uppercase text-primary">
                            {{ section.eyebrow }}
                        </div>
                        <h2
                            class="font-display text-xl/8 tracking-tight text-pretty text-neutral-950 dark:text-white"
                        >
                            {{ section.title }}
                        </h2>
                        <p class="text-sm/7 text-neutral-700 dark:text-neutral-400">
                            {{ section.description }}
                        </p>
                        <ul class="mt-auto flex flex-col gap-2 pt-2">
                            <li
                                v-for="feature in section.features.slice(0, 3)"
                                :key="feature"
                                class="flex gap-2 text-sm/6 text-neutral-700 dark:text-neutral-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="mt-0.5 size-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                {{ feature }}
                            </li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>

        <SiteSection
            :eyebrow="t('features.supporting.eyebrow')"
            :headline="t('features.supporting.headline')"
            :subheadline="t('features.supporting.subheadline')"
            bg="gray"
            class="!py-14 sm:!py-20"
        >
            <BentoGrid :items="supportingItems" />
        </SiteSection>

        <SiteSection
            :eyebrow="t('features.migration.eyebrow')"
            :headline="t('features.migration.title')"
            :subheadline="t('features.migration.description')"
            class="!py-14 sm:!py-20"
        >
            <ul class="flex max-w-2xl flex-col gap-3">
                <li
                    v-for="feature in (tm('features.migration.features') as string[])"
                    :key="feature"
                    class="flex gap-3 text-sm/7 text-neutral-700 dark:text-neutral-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                        />
                    </svg>
                    {{ feature }}
                </li>
            </ul>
        </SiteSection>

        <SiteSection
            :headline="t('features.faq.headline')"
            class="!py-14 sm:!py-20"
        >
            <FaqSection :items="faqItems" />
        </SiteSection>

        <CtaSection />
    </div>
</template>
