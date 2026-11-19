<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue';
import SiteHeading from '@/components/SiteHeading.vue';
import { usePageMeta } from '@/composables/usePageMeta';
import {
    BROWSER_STORAGE,
    displayStorageKey,
    formatLegalDate,
    LEGAL,
    PRIVACY_SECTIONS,
    PRIVACY_UPDATED,
} from '@/lib/legal';
import { ArrowUpRight } from '@lucide/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, locale } = useI18n();

usePageMeta('privacy.meta.title', 'privacy.meta.description', { noindex: true });

const updated = computed(() => formatLegalDate(PRIVACY_UPDATED, locale.value));

// Each paragraph renders through <i18n-t> by index, which compiles it, so `{email}` and
// `{name}` become the slots below and both facts come from LEGAL. tm() only counts the
// paragraphs; it returns raw messages and would print the braces. `scope="global"` because
// these pages have no local i18n scope, and the default 'parent' warns in dev once per
// instance before falling back to the same global composer.
const sections = computed(() =>
    PRIVACY_SECTIONS.map((section) => ({
        ...section,
        paragraphs: (tm(`privacy.sections.${section.key}.paragraphs`) as unknown[]).length,
    })),
);

const link =
    'font-medium text-primary-text underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';

// WCAG 1.4.1: a link inside running text needs a non-colour cue at rest (the accent against
// body text is under 3:1), so it is underlined, as /404's link is. `link` above is for links
// that sit in a paragraph of their own and keep the hover-only underline.
const inlineLink =
    'font-medium text-primary-text underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';
</script>

<template>
    <SiteContainer class="py-16 sm:py-24">
        <article class="mx-auto max-w-3xl">
            <SiteHeading class="text-4xl/11 wrap-break-word hyphens-auto sm:text-5xl/14">
                {{ t('privacy.headline') }}
            </SiteHeading>
            <p class="mt-4 text-sm/6 text-neutral-500 dark:text-neutral-400">
                {{ t('privacy.updated', { date: updated }) }}
            </p>

            <div
                class="mt-10 flex flex-col gap-4 text-base/7 text-neutral-700 dark:text-neutral-300"
            >
                <p>{{ t('privacy.intro.scope') }}</p>
                <p>{{ t('privacy.intro.summary') }}</p>
            </div>

            <section
                v-for="section in sections"
                :key="section.key"
                :aria-labelledby="`privacy-${section.key}`"
                class="mt-12 flex flex-col gap-4 text-base/7 text-neutral-700 dark:text-neutral-300"
            >
                <h2
                    :id="`privacy-${section.key}`"
                    class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 dark:text-white"
                >
                    {{ t(`privacy.sections.${section.key}.title`) }}
                </h2>
                <template v-for="(_, index) in section.paragraphs" :key="index">
                    <i18n-t
                        :keypath="`privacy.sections.${section.key}.paragraphs.${index}`"
                        tag="p"
                        scope="global"
                    >
                        <template #name>{{ LEGAL.name }}</template>
                        <template #email>
                            <a :href="`mailto:${LEGAL.email}`" :class="inlineLink">{{
                                LEGAL.email
                            }}</a>
                        </template>
                    </i18n-t>
                    <!-- The storage list sits between the lead sentence and the closing one. -->
                    <ul
                        v-if="section.key === 'storage' && index === 0"
                        class="flex list-disc flex-col gap-2 pl-5 marker:text-neutral-400"
                    >
                        <li v-for="entry in BROWSER_STORAGE" :key="entry.key">
                            <code
                                class="rounded bg-neutral-100 px-1 py-0.5 font-mono text-sm wrap-anywhere text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                                >{{ displayStorageKey(entry.key) }}</code
                            >
                            ({{ entry.area }}):
                            {{ t(`privacy.sections.storage.items.${entry.item}`) }}
                        </li>
                    </ul>
                </template>
                <p v-if="section.policy">
                    <a :href="section.policy" rel="noopener noreferrer" :class="link">
                        {{ t(`privacy.sections.${section.key}.policy`)
                        }}<ArrowUpRight
                            class="ml-0.5 inline size-4 align-[-0.125em]"
                            aria-hidden="true"
                        />
                    </a>
                </p>
            </section>
        </article>
    </SiteContainer>
</template>
