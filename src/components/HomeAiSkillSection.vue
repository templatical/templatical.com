<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ChevronRight } from '@lucide/vue';
import { URLS, localizedUrl } from '@/lib/urls';
import RevealOnScroll from './RevealOnScroll.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const { t, locale } = useI18n();

// A literal shell command, not translatable prose, and the copy button needs it
// verbatim — so it stays out of i18n. One command is the whole install: it reads
// the repository directly and writes into whichever SKILL.md-reading agents are
// present, which is why no agent is named here or in the caption above it.
const installCommand = 'npx skills add templatical/sdk';
const { copy, copied, isSupported } = useClipboard({ source: installCommand });

// The skill routes every request down one of two halves, so the section shows one
// real prompt per half rather than describing the router.
//
// The verb runs are the skill's own mode names, verbatim from SKILL.md's routing
// table — identifiers you can actually say to it, not a marketing list. They stay
// out of i18n for the same reason the command above does: translating `build` to
// `bauen` would break the correspondence with the mode it names, and they render
// monospace so they read as tokens. Keep them in the table's order and in step
// with it — a new mode there is a new word here.
const halves = computed(() => [
    {
        key: 'authoring',
        label: t('home.aiSkill.authoringLabel'),
        prompt: t('home.aiSkill.authoringPrompt'),
        modes: ['build', 'edit', 'import', 'validate', 'export', 'live'],
    },
    {
        key: 'integration',
        label: t('home.aiSkill.integrationLabel'),
        prompt: t('home.aiSkill.integrationPrompt'),
        modes: ['integrate', 'scaffold', 'diagnose', 'docs'],
    },
]);
</script>

<template>
    <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
        <SiteContainer>
            <RevealOnScroll>
                <div class="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
                    <div class="flex max-w-3xl flex-col items-center gap-4">
                        <SiteEyebrow>{{ t('home.aiSkill.eyebrow') }}</SiteEyebrow>
                        <SiteSubheading>{{ t('home.aiSkill.headline') }}</SiteSubheading>
                        <SiteText size="lg" class="max-w-2xl text-pretty">
                            <p>{{ t('home.aiSkill.subheadline') }}</p>
                        </SiteText>
                    </div>

                    <div class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
                        <figure
                            v-for="half in halves"
                            :key="half.key"
                            class="flex flex-col gap-3 text-left"
                        >
                            <figcaption
                                class="text-xs/5 font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
                            >
                                {{ half.label }}
                            </figcaption>
                            <blockquote
                                class="flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-base/7 text-pretty text-neutral-700 italic dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                            >
                                {{ half.prompt }}
                            </blockquote>
                            <ul
                                class="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs/5 text-neutral-500 dark:text-neutral-400"
                            >
                                <li v-for="(mode, i) in half.modes" :key="mode" class="flex gap-2">
                                    <span
                                        v-if="i > 0"
                                        aria-hidden="true"
                                        class="text-neutral-300 dark:text-neutral-700"
                                        >·</span
                                    >
                                    {{ mode }}
                                </li>
                            </ul>
                        </figure>
                    </div>

                    <div
                        class="w-full max-w-xl overflow-hidden rounded-xl bg-neutral-50 text-left ring-1 ring-neutral-950/10 dark:bg-neutral-900 dark:ring-white/10"
                    >
                        <div
                            class="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-2.5 dark:border-neutral-800"
                        >
                            <span
                                class="text-xs/5 font-medium tracking-wide text-neutral-500 dark:text-neutral-400"
                            >
                                {{ t('home.aiSkill.commandCaption') }}
                            </span>
                            <button
                                v-if="isSupported"
                                type="button"
                                class="shrink-0 rounded-md bg-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                @click="copy(installCommand)"
                            >
                                {{
                                    copied
                                        ? t('home.aiSkill.copiedLabel')
                                        : t('home.aiSkill.copyLabel')
                                }}
                            </button>
                        </div>
                        <div class="overflow-x-auto px-4 py-3">
                            <span
                                class="block font-mono text-sm/6 whitespace-nowrap text-neutral-800 dark:text-neutral-200"
                                >{{ installCommand }}</span
                            >
                        </div>
                    </div>

                    <p class="max-w-2xl text-sm/6 text-neutral-500 dark:text-neutral-400">
                        {{ t('home.aiSkill.installNote') }}
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <SiteButton
                            :href="localizedUrl('agentSkillDocs', locale)"
                            size="lg"
                            external
                        >
                            {{ t('home.aiSkill.ctaPrimary') }}
                        </SiteButton>
                        <SiteButton :href="URLS.skillRepo" variant="plain" size="lg" external>
                            {{ t('home.aiSkill.ctaSecondary') }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>

                    <p class="text-sm/6 text-neutral-500 dark:text-neutral-400">
                        {{ t('home.aiSkill.cloudNote') }}
                        <a
                            :href="URLS.cloud"
                            target="_blank"
                            rel="noopener"
                            class="font-medium text-amber-700 hover:underline dark:text-amber-300"
                            >{{ t('home.aiSkill.cloudNoteLink') }}</a
                        >
                    </p>
                </div>
            </RevealOnScroll>
        </SiteContainer>
    </section>
</template>
