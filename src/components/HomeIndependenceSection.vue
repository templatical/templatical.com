<script setup lang="ts">
import { computed } from 'vue';
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
// `computed`, not a bare `const`: `tm()` reads the locale once at call time, so a
// plain const would freeze these four claims at the locale active when the component
// was created — the SSG-prerendered 'en' — and a client-side locale switch would leave
// them in English while every `t()` around them turned German. Same shape as
// HeroSection.vue's `heroBadges`.
const claims = computed(() => tm('home.independence.claims') as string[]);

const vendorPatterns = computed(
    () => tm('home.independence.vendors.items') as Array<{ term: string; detail: string }>,
);
</script>

<template>
    <section
        class="border-t border-neutral-950/5 bg-white py-20 sm:py-28 dark:border-white/10 dark:bg-neutral-950"
    >
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
                            class="mt-1 size-5 shrink-0 text-primary-text"
                            aria-hidden="true"
                        />
                        {{ claim }}
                    </li>
                </ul>
            </RevealOnScroll>

            <div
                class="mx-auto flex w-full max-w-3xl flex-col gap-5 border-t border-neutral-200 pt-10 dark:border-neutral-800"
            >
                <p class="text-sm/6 text-neutral-600 dark:text-neutral-400">
                    {{ t('home.independence.vendors.intro') }}
                </p>
                <dl class="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
                    <div
                        v-for="pattern in vendorPatterns"
                        :key="pattern.term"
                        class="flex flex-col gap-1.5"
                    >
                        <dt class="text-sm/6 font-medium text-neutral-950 dark:text-white">
                            {{ pattern.term }}
                        </dt>
                        <dd class="text-sm/6 text-pretty text-neutral-700 dark:text-neutral-300">
                            {{ pattern.detail }}
                        </dd>
                    </div>
                </dl>
                <p class="text-xs/5 text-neutral-600 dark:text-neutral-400">
                    {{ t('home.independence.vendors.note') }}
                </p>
            </div>
        </SiteContainer>
    </section>
</template>
