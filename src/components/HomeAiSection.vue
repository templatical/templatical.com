<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ChevronRight, ImagePlus, MessagesSquare, PenLine, Wrench } from '@lucide/vue';
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
  createHttpAiProvider,
} from '@templatical/ai-kit/client'

const editor = await init({
  container: '#editor',
  templates: myTemplatesProvider,
  ai: createHttpAiProvider({ baseUrl: '/api/ai' }),
})`;

// The four features, in the order the docs name them. Icons are decoration; the
// names and lines carry the facts.
const icons = [MessagesSquare, PenLine, Wrench, ImagePlus];
const features = computed(() =>
    (tm('home.ai.features') as Array<{ name: string; body: string }>).map((feature, i) => ({
        ...feature,
        icon: icons[i],
    })),
);
const backend = computed(() => tm('home.ai.backend') as string[]);

const featuresAnchor = `/features#${featureSectionId('ai')}`;
</script>

<template>
    <!-- First section after the hero: the aurora fades to exactly this background
         and bleeds 160px into it, so `relative` lifts the content above it. -->
    <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
        <SiteContainer class="relative">
            <RevealOnScroll>
                <div class="mx-auto flex max-w-5xl flex-col items-center gap-12">
                    <div class="flex max-w-3xl flex-col items-center gap-4 text-center">
                        <SiteEyebrow>{{ t('home.ai.eyebrow') }}</SiteEyebrow>
                        <SiteSubheading>{{ t('home.ai.headline') }}</SiteSubheading>
                        <SiteText size="lg" class="max-w-2xl text-pretty">
                            <p>{{ t('home.ai.subheadline') }}</p>
                        </SiteText>
                    </div>

                    <div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
                        <div
                            class="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                        >
                            <h3
                                class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                            >
                                {{ t('home.ai.usersTitle') }}
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
                                {{ t('home.ai.tryNote') }}
                            </p>
                        </div>

                        <div
                            class="flex min-w-0 flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                        >
                            <h3
                                class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                            >
                                {{ t('home.ai.backendTitle') }}
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
                                                ? t('home.ai.copiedLabel')
                                                : t('home.ai.copyLabel')
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
                        <SiteButton :href="localizedUrl('aiDocs', locale)" size="lg" external>
                            {{ t('home.ai.ctaPrimary') }}
                        </SiteButton>
                        <SiteButton :href="featuresAnchor" variant="plain" size="lg">
                            {{ t('home.ai.ctaSecondary') }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                </div>
            </RevealOnScroll>
        </SiteContainer>
    </section>
</template>
