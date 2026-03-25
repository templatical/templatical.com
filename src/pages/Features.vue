<script setup lang="ts">
import BentoGrid from '@/components/BentoGrid.vue';
import CtaSection from '@/components/CtaSection.vue';
import FaqSection from '@/components/FaqSection.vue';
import SiteSection from '@/components/SiteSection.vue';
import IconArrowDownTray from '@/components/icons/IconArrowDownTray.vue';
import IconArrowUturnLeft from '@/components/icons/IconArrowUturnLeft.vue';
import IconDevicePhone from '@/components/icons/IconDevicePhone.vue';
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
        eyebrow: t('features.editor.eyebrow'),
        title: t('features.editor.title'),
        description: t('features.editor.description'),
        features: tm('features.editor.features') as string[],
        bg: 'gray',
    },
    {
        eyebrow: t('features.dx.eyebrow'),
        title: t('features.dx.title'),
        description: t('features.dx.description'),
        features: tm('features.dx.features') as string[],
        bg: 'white',
    },
    {
        eyebrow: t('features.output.eyebrow'),
        title: t('features.output.title'),
        description: t('features.output.description'),
        features: tm('features.output.features') as string[],
        bg: 'gray',
    },
    {
        eyebrow: t('features.extensibility.eyebrow'),
        title: t('features.extensibility.title'),
        description: t('features.extensibility.description'),
        features: tm('features.extensibility.features') as string[],
        bg: 'white',
    },
]);

const moreItems = computed(() => [
    {
        key: 'themeCustomization',
        icon: IconSwatch,
        title: t('features.moreItems.themeCustomization.title'),
        description: t('features.moreItems.themeCustomization.description'),
    },
    {
        key: 'darkMode',
        icon: IconMoon,
        title: t('features.moreItems.darkMode.title'),
        description: t('features.moreItems.darkMode.description'),
    },
    {
        key: 'i18n',
        icon: IconGlobe,
        title: t('features.moreItems.i18n.title'),
        description: t('features.moreItems.i18n.description'),
    },
    {
        key: 'undoRedo',
        icon: IconArrowUturnLeft,
        title: t('features.moreItems.undoRedo.title'),
        description: t('features.moreItems.undoRedo.description'),
    },
    {
        key: 'responsivePreview',
        icon: IconDevicePhone,
        title: t('features.moreItems.responsivePreview.title'),
        description: t('features.moreItems.responsivePreview.description'),
    },
    {
        key: 'beefreeImport',
        icon: IconArrowDownTray,
        title: t('features.moreItems.beefreeImport.title'),
        description: t('features.moreItems.beefreeImport.description'),
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
    <div>
        <SiteSection
            :eyebrow="t('features.hero.eyebrow')"
            :headline="t('features.hero.headline')"
            :subheadline="t('features.hero.subheadline')"
            headline-as="h1"
        />

        <section
            v-for="(section, index) in featureSections"
            :key="index"
            :class="[
                'py-20 sm:py-28',
                section.bg === 'gray'
                    ? 'bg-neutral-50 dark:bg-neutral-900'
                    : 'bg-white dark:bg-neutral-950',
            ]"
        >
            <div
                class="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10"
            >
                <div class="max-w-2xl">
                    <div class="text-sm/7 font-semibold text-primary">
                        {{ section.eyebrow }}
                    </div>
                    <h2
                        class="mt-2 font-display text-[2rem]/10 tracking-tight text-pretty text-neutral-950 sm:text-4xl/12 dark:text-white"
                    >
                        {{ section.title }}
                    </h2>
                    <p
                        class="mt-4 text-base/7 text-neutral-700 dark:text-neutral-400"
                    >
                        {{ section.description }}
                    </p>
                    <ul class="mt-6 flex flex-col gap-3">
                        <li
                            v-for="feature in section.features"
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
                </div>
            </div>
        </section>

        <SiteSection
            :eyebrow="t('features.moreFeatures.eyebrow')"
            :headline="t('features.moreFeatures.headline')"
            :subheadline="t('features.moreFeatures.subheadline')"
            bg="gray"
        >
            <BentoGrid :items="moreItems" />
        </SiteSection>

        <SiteSection
            :eyebrow="t('features.migration.eyebrow')"
            :headline="t('features.migration.title')"
            :subheadline="t('features.migration.description')"
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

        <SiteSection :headline="t('features.faq.headline')">
            <FaqSection :items="faqItems" />
        </SiteSection>

        <CtaSection />
    </div>
</template>
