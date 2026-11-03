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

// No package beyond the editor: Translate needs only an object with a translate
// method, which is the point this snippet makes. The AI kit is the optional strip
// below. Wrapped so its longest line fits the column on desktop without scrolling.
const providerCode = `const editor = await init({
  container: '#editor',
  localization: {
    locales: ['en', 'de', 'fr'],
    doNotTranslate: ['Acme'],
  },
  // Any object with translate(). Your backend
  // calls DeepL, a TMS or an LLM.
  translation: {
    async translate(request, signal) {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal,
      })
      if (!res.ok) throw new Error(res.statusText)
      return res.json() // { fields: [{ id, text }] }
    },
  },
})`;

// In the order an author meets them. Icons are decoration; the names and lines
// carry the facts.
const icons = [Languages, BadgeAlert, ListChecks, MessagesSquare];
const features = computed(() =>
    (tm('home.languages.features') as Array<{ name: string; body: string }>).map((feature, i) => ({
        ...feature,
        icon: icons[i],
    })),
);
const translateLines = computed(() => tm('home.languages.translate') as string[]);
const kit = computed(() => tm('home.languages.kit') as Array<{ name: string; body: string }>);

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

                    <div class="flex w-full flex-col gap-6">
                        <div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
                            <!-- Built in: everything that works with localization alone. -->
                            <div
                                class="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                            >
                                <h3
                                    class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                                >
                                    {{ t('home.languages.builtInTitle') }}
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
                                    {{ t('home.languages.builtInNote') }}
                                </p>
                            </div>

                            <!-- Translate: one object with a translate method, no package. -->
                            <div
                                class="flex min-w-0 flex-col gap-6 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10"
                            >
                                <h3
                                    class="font-display text-xl tracking-tight text-neutral-950 sm:text-2xl dark:text-white"
                                >
                                    {{ t('home.languages.translateTitle') }}
                                </h3>

                                <CodeBlock
                                    :code="providerCode"
                                    lang="javascript"
                                    class="w-full text-left"
                                />

                                <ul class="flex flex-col gap-3">
                                    <li
                                        v-for="line in translateLines"
                                        :key="line"
                                        class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                                    >
                                        {{ line }}
                                    </li>
                                </ul>
                                <p
                                    class="mt-auto border-t border-neutral-200 pt-5 text-sm/6 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                                >
                                    {{ t('home.languages.tryNote') }}
                                </p>
                            </div>
                        </div>

                        <!-- Optional, so it reads as an addition: an outline on the
                             page ground rather than a filled card of its own. -->
                        <div
                            class="flex flex-col gap-6 rounded-2xl p-6 ring-1 ring-neutral-950/10 sm:p-8 dark:ring-white/10"
                        >
                            <div
                                class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
                            >
                                <div class="flex max-w-xl flex-col gap-2">
                                    <h3
                                        class="font-display text-lg tracking-tight text-neutral-950 sm:text-xl dark:text-white"
                                    >
                                        {{ t('home.languages.kitTitle') }}
                                    </h3>
                                    <p
                                        class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                                    >
                                        {{ t('home.languages.kitIntro') }}
                                    </p>
                                </div>
                                <div
                                    class="overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-950/10 lg:shrink-0 dark:bg-neutral-900 dark:ring-white/10"
                                >
                                    <div
                                        class="flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm/6"
                                    >
                                        <!-- Wraps rather than truncates: on a phone the
                                             package name is the part an ellipsis would hide. -->
                                        <span
                                            class="min-w-0 break-all text-neutral-700 dark:text-neutral-300"
                                        >
                                            <span
                                                class="mr-2 text-neutral-400 select-none dark:text-neutral-600"
                                                >$</span
                                            >
                                            {{ installCommand }}
                                        </span>
                                        <button
                                            v-if="isSupported"
                                            type="button"
                                            class="shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-950/10 transition hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-white/10 dark:hover:bg-neutral-700"
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
                            </div>
                            <ul class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                <li
                                    v-for="item in kit"
                                    :key="item.name"
                                    class="flex flex-col gap-1"
                                >
                                    <code
                                        class="font-mono text-sm/6 break-all text-neutral-950 dark:text-white"
                                        >{{ item.name }}</code
                                    >
                                    <span
                                        class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                                        >{{ item.body }}</span
                                    >
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
