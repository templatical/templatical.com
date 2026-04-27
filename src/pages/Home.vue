<script setup lang="ts">
import ComparisonTable from '@/components/ComparisonTable.vue';
import CtaSection from '@/components/CtaSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import SiteButton from '@/components/SiteButton.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteSection from '@/components/SiteSection.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import { URLS } from '@/lib/urls';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead({
    title: computed(() => t('home.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('home.meta.description')),
        },
    ],
});

const comparisonRows = computed(() => [
    {
        feature: t('home.comparison.rows.openSource'),
        templatical: true,
        beefree: false,
    },
    {
        feature: t('home.comparison.rows.yourData'),
        templatical: true,
        beefree: false,
    },
    {
        feature: t('home.comparison.rows.pricing'),
        templatical: t('home.comparison.templaticalValues.pricing'),
        beefree: t('home.comparison.beefreeValues.pricing'),
    },
    {
        feature: t('home.comparison.rows.dragAndDrop'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.customBlocks'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.mjmlSupport'),
        templatical: true,
        beefree: false,
    },
    {
        feature: t('home.comparison.rows.mergeTags'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.displayConditions'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.darkMode'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.undoRedo'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.responsivePreview'),
        templatical: true,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.migrationTools'),
        templatical: true,
        beefree: false,
        highlight: true,
    },
    {
        feature: t('home.comparison.rows.vendorLockIn'),
        templatical: true,
        beefree: false,
    },
    {
        feature: t('home.comparison.rows.landingPageBuilder'),
        templatical: false,
        beefree: true,
    },
    {
        feature: t('home.comparison.rows.communityDriven'),
        templatical: true,
        beefree: false,
    },
]);
</script>

<template>
    <div>
        <HeroSection />

        <!-- TODO: Uncomment when real logos are available
        <SiteSection
            :eyebrow="t('home.trustedBy.eyebrow')"
            :headline="t('home.trustedBy.headline')"
            bg="gray"
        >
            <div
                class="grid grid-cols-2 items-center gap-8 opacity-40 grayscale sm:grid-cols-3 lg:grid-cols-6"
            >
                <div
                    v-for="i in 6"
                    :key="i"
                    class="flex h-12 items-center justify-center rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50"
                >
                    <span class="text-sm text-neutral-400">Logo</span>
                </div>
            </div>
        </SiteSection>
        -->

        <SiteSection
            :eyebrow="t('home.comparison.eyebrow')"
            :headline="t('home.comparison.headline')"
            :subheadline="t('home.comparison.subheadline')"
        >
            <ComparisonTable :rows="comparisonRows" />
            <p
                class="mt-6 text-center text-sm/7 font-medium text-primary"
            >
                {{ t('home.comparison.migrationNote') }}
            </p>
            <div class="mt-6 flex justify-center">
                <SiteButton
                    :href="URLS.comparison"
                    variant="plain"
                    external
                >
                    {{ t('home.comparison.seeFullComparison') }}
                    <IconChevronRight />
                </SiteButton>
            </div>
        </SiteSection>

        <section class="bg-neutral-50 py-16 dark:bg-neutral-900">
            <SiteContainer>
                <div class="flex flex-col items-center gap-4 text-center">
                    <h2
                        class="text-xl/8 font-medium text-neutral-950 dark:text-white"
                    >
                        {{ t('home.cloud.headline') }}
                    </h2>
                    <p
                        class="max-w-xl text-base/7 text-neutral-600 dark:text-neutral-400"
                    >
                        {{ t('home.cloud.description') }}
                    </p>
                    <SiteButton
                        :href="URLS.cloud"
                        variant="soft"
                        external
                    >
                        {{ t('home.cloud.cta') }}
                        <IconChevronRight />
                    </SiteButton>
                </div>
            </SiteContainer>
        </section>

        <CtaSection />
    </div>
</template>
