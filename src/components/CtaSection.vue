<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal';
import { URLS } from '@/lib/urls';
import { useI18n } from 'vue-i18n';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const { t } = useI18n();
const { sectionRef, isVisible, shouldHide } = useScrollReveal(0.2);
</script>

<template>
    <section
        ref="sectionRef"
        class="bg-neutral-50 py-20 sm:py-28 dark:bg-neutral-950"
    >
        <SiteContainer>
            <div
                :class="[
                    'bg-inverse flex flex-col items-center gap-8 rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-24',
                    isVisible && 'motion-safe:animate-scroll-reveal',
                    shouldHide && 'motion-safe:opacity-0',
                ]"
            >
                <h2
                    class="max-w-3xl font-display text-3xl/10 tracking-tight text-pretty text-white sm:text-5xl/14"
                >
                    {{ t('home.cta.headline') }}
                </h2>
                <p class="max-w-2xl text-lg/8 text-neutral-400">
                    {{ t('home.cta.subheadline') }}
                </p>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <SiteButton
                        :href="URLS.docs"
                        color="white"
                        size="lg"
                        external
                    >
                        {{ t('home.cta.ctaPrimary') }}
                    </SiteButton>
                    <SiteButton
                        :href="URLS.github"
                        variant="plain"
                        color="white"
                        size="lg"
                        external
                    >
                        {{ t('home.cta.ctaSecondary') }}
                        <IconChevronRight />
                    </SiteButton>
                    <SiteButton
                        :href="URLS.sponsor"
                        variant="plain"
                        color="white"
                        size="lg"
                        external
                    >
                        {{ t('home.cta.ctaTertiary') }}
                        <IconChevronRight />
                    </SiteButton>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>
