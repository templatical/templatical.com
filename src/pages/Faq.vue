<script setup lang="ts">
import CtaSection from '@/components/CtaSection.vue';
import FaqSection from '@/components/FaqSection.vue';
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteText from '@/components/SiteText.vue';
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
        'beefree',
        'migrate',
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
            class="relative isolate -mt-21 overflow-hidden bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950"
        >
            <HeroAurora
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

        <CtaSection />
    </div>
</template>
