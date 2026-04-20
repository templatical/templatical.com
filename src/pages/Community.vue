<script setup lang="ts">
import CommunityCard from '@/components/CommunityCard.vue';
import CtaSection from '@/components/CtaSection.vue';
import SiteButton from '@/components/SiteButton.vue';
import SiteSection from '@/components/SiteSection.vue';
import IconGitHub from '@/components/icons/IconGitHub.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import { URLS } from '@/lib/urls';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead({
    title: computed(() => t('community.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('community.meta.description')),
        },
    ],
});
</script>

<template>
    <div>
        <SiteSection
            :eyebrow="t('community.hero.eyebrow')"
            :headline="t('community.hero.headline')"
            :subheadline="t('community.hero.subheadline')"
            headline-as="h1"
        />

        <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
            <div
                class="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 px-6 md:max-w-3xl lg:max-w-7xl lg:px-10"
            >
                <CommunityCard
                    :title="t('community.github.title')"
                    :description="t('community.github.description')"
                    :href="URLS.github"
                    :cta="t('community.github.cta')"
                    :icon="IconGitHub"
                />
            </div>
        </section>

        <SiteSection
            :eyebrow="t('community.contributing.eyebrow')"
            :headline="t('community.contributing.headline')"
            :subheadline="t('community.contributing.subheadline')"
            bg="gray"
        >
            <template #cta>
                <SiteButton :href="URLS.github" external>
                    {{ t('community.contributing.cta') }}
                    <IconChevronRight />
                </SiteButton>
            </template>
            <div />
        </SiteSection>

        <CtaSection />
    </div>
</template>
