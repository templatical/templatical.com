<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { BadgeAlert, ChevronRight, Languages, ListChecks, MessagesSquare } from '@lucide/vue';
import { localizedUrl } from '@/lib/urls';
import { featureSectionId } from '@/composables/useFeatureNav';
import CodeBlock from './CodeBlock.vue';
import RevealOnScroll from './RevealOnScroll.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const { t, tm, locale } = useI18n();

// Literal code, not translatable prose: the copy button reproduces the command
// verbatim, and the snippet's braces would break vue-i18n's message compiler.
const installCommand = 'npm install @templatical/ai-kit';
const { copy, copied, isSupported } = useClipboard({ source: installCommand });

// Wrapped so its longest line fits the backend column on desktop without scrolling.
const clientCode = `import {
  createHttpTranslationProvider,
} from '@templatical/ai-kit/client'

const editor = await init({
  container: '#editor',
  localization: {
    locales: ['en', 'de', 'fr'],
    doNotTranslate: ['Acme'],
  },
  translation: createHttpTranslationProvider({
    url: '/api',
  }),
})`;

// In the order an author meets them. Icons are decoration; the names and lines
// carry the facts.
const icons = [Languages, ListChecks, BadgeAlert, MessagesSquare];
const features = computed(() =>
    (tm('home.languages.features') as Array<{ name: string; body: string }>).map((feature, i) => ({
        ...feature,
        icon: icons[i],
    })),
);
const backend = computed(() => tm('home.languages.backend') as string[]);

const featuresAnchor = `/features#${featureSectionId('languages')}`;
</script>

<template>
    <!-- White like the Agent Skill section above it, so a hairline marks where one ends. -->
    <section
        class="border-t border-neutral-950/5 bg-white py-20 sm:py-28 dark:border-white/10 dark:bg-neutral-950"
    >
        <SiteContainer>
            <RevealOnScroll>
                <div class="mx-auto flex max-w-5xl flex-col items-center gap-12">
                    <div class="flex max-w-3xl flex-col items-center gap-4 text-center">
                        <SiteEyebrow>{{ t('home.languages.eyebrow') }}</SiteEyebrow>
                        <SiteSubheading>{{ t('home.languages.headline') }}</SiteSubheading>
                        <SiteText size="lg" class="max-w-2xl text-pretty">
                            <p>{{ t('home.languages.subheadline') }}</p>
                        </SiteText>
                    </div>

                    <div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
                        <div
                            class="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                        >
                            <h3
                                class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                            >
                                {{ t('home.languages.authorsTitle') }}
                            </h3>
                            <ul class="flex flex-col gap-5">
                                <li
                                    v-for="feature in features"
                                    :key="feature.name"
                                    class="flex gap-3"
                                >
                                    <component
                                        :is="feature.icon"
                                        class="mt-1 size-5 shrink-0 text-primary-text"
                                        aria-hidden="true"
                                    />
                                    <div class="flex flex-col gap-1">
                                        <span
                                            class="text-base/7 font-medium text-neutral-950 dark:text-white"
                                            >{{ feature.name }}</span
                                        >
                                        <span
                                            class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                                            >{{ feature.body }}</span
                                        >
                                    </div>
                                </li>
                            </ul>
                            <p
                                class="mt-auto border-t border-neutral-200 pt-5 text-sm/6 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                            >
                                {{ t('home.languages.tryNote') }}
                            </p>
                        </div>

                        <div
                            class="flex min-w-0 flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                        >
                            <h3
                                class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                            >
                                {{ t('home.languages.backendTitle') }}
                            </h3>

                            <div
                                class="overflow-hidden rounded-xl bg-white ring-1 ring-neutral-950/10 dark:bg-neutral-950 dark:ring-white/10"
                            >
                                <div
                                    class="flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm/6"
                                >
                                    <span class="truncate text-neutral-700 dark:text-neutral-300">
                                        <span
                                            class="mr-2 text-neutral-400 select-none dark:text-neutral-600"
                                            >$</span
                                        >
                                        {{ installCommand }}
                                    </span>
                                    <button
                                        v-if="isSupported"
                                        type="button"
                                        class="shrink-0 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                        @click="copy(installCommand)"
                                    >
                                        {{
                                            copied
                                                ? t('home.languages.copiedLabel')
                                                : t('home.languages.copyLabel')
                                        }}
                                    </button>
                                </div>
                            </div>

                            <CodeBlock
                                :code="clientCode"
                                lang="javascript"
                                class="w-full text-left"
                            />

                            <ul class="flex flex-col gap-3">
                                <li
                                    v-for="line in backend"
                                    :key="line"
                                    class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                                >
                                    {{ line }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <SiteButton
                            :href="localizedUrl('localizedTemplatesDocs', locale)"
                            size="lg"
                            external
                        >
                            {{ t('home.languages.ctaPrimary') }}
                        </SiteButton>
                        <SiteButton :href="featuresAnchor" variant="plain" size="lg">
                            {{ t('home.languages.ctaSecondary') }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                </div>
            </RevealOnScroll>
        </SiteContainer>
    </section>
</template>
