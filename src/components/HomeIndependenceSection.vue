<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Check } from '@lucide/vue';
import RevealOnScroll from './RevealOnScroll.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const { t, tm } = useI18n();

// Deliberately no code sample here. This section used to carry its own `init()`
// snippet, which was a strict subset of the one in HomeCloseSection — two near-identical
// integration examples on one page. The closer's snippet is the fuller one and makes
// this section's point better anyway: it shows the whole integration, and there is no
// API key in it.
const claims = tm('home.independence.claims') as string[];
</script>

<template>
    <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
        <SiteContainer class="flex flex-col gap-12 sm:gap-16">
            <div class="mx-auto flex max-w-2xl flex-col gap-4 text-center">
                <SiteEyebrow>{{ t('home.independence.eyebrow') }}</SiteEyebrow>
                <SiteSubheading>{{ t('home.independence.headline') }}</SiteSubheading>
                <SiteText class="text-pretty">
                    <p>{{ t('home.independence.subheadline') }}</p>
                </SiteText>
            </div>

            <RevealOnScroll>
                <ul class="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-10">
                    <li
                        v-for="claim in claims"
                        :key="claim"
                        class="flex gap-3 text-base/7 text-pretty text-neutral-800 dark:text-neutral-200"
                    >
                        <Check
                            :stroke-width="2.25"
                            class="mt-1 size-5 shrink-0 text-primary"
                            aria-hidden="true"
                        />
                        {{ claim }}
                    </li>
                </ul>
            </RevealOnScroll>
        </SiteContainer>
    </section>
</template>
