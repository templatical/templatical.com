<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ChevronRight } from 'lucide-vue-next';
import { URLS, localizedUrl } from '@/lib/urls';
import RevealOnScroll from './RevealOnScroll.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const { t, locale } = useI18n();

// Claude Code slash commands — kept out of i18n (the `@` in the plugin name is
// reserved in vue-i18n message strings). The copy button copies both lines.
const installCommand =
    '/plugin marketplace add templatical/sdk\n/plugin install templatical-email@templatical';
const commandLines = installCommand.split('\n');
const { copy, copied, isSupported } = useClipboard({ source: installCommand });
</script>

<template>
    <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
        <SiteContainer>
            <RevealOnScroll>
                <div class="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                    <div class="flex flex-col items-center gap-4">
                        <SiteEyebrow>{{ t('home.aiSkill.eyebrow') }}</SiteEyebrow>
                        <SiteSubheading>{{ t('home.aiSkill.headline') }}</SiteSubheading>
                        <SiteText size="lg" class="max-w-2xl text-pretty">
                            <p>{{ t('home.aiSkill.subheadline') }}</p>
                        </SiteText>
                    </div>

                    <figure class="w-full max-w-xl">
                        <blockquote
                            class="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-left text-base/7 text-pretty text-neutral-700 italic dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                        >
                            {{ t('home.aiSkill.examplePrompt') }}
                        </blockquote>
                    </figure>

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
                                {{ copied ? t('home.aiSkill.copiedLabel') : t('home.aiSkill.copyLabel') }}
                            </button>
                        </div>
                        <div class="overflow-x-auto px-4 py-3">
                            <div
                                class="flex flex-col gap-1 font-mono text-sm/6 text-neutral-800 dark:text-neutral-200"
                            >
                                <span
                                    v-for="line in commandLines"
                                    :key="line"
                                    class="whitespace-nowrap"
                                    >{{ line }}</span
                                >
                            </div>
                        </div>
                    </div>

                    <p class="text-sm/6 text-neutral-500 dark:text-neutral-400">
                        {{ t('home.aiSkill.altInstall') }}
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <SiteButton
                            :href="localizedUrl('agentSkillDocs', locale)"
                            size="lg"
                            external
                        >
                            {{ t('home.aiSkill.ctaPrimary') }}
                        </SiteButton>
                        <SiteButton
                            :href="URLS.skillRepo"
                            variant="plain"
                            size="lg"
                            external
                        >
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
