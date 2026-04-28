<script setup lang="ts">
import CompetitorComparison from '@/components/CompetitorComparison.vue';
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
            <CompetitorComparison />
            <div class="mt-10 flex justify-center">
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
