<script setup lang="ts">
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import SiteButton from '@/components/SiteButton.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteText from '@/components/SiteText.vue';
import {
    IMPORTER_COUNT,
    IMPORTER_GROUP_ORDER,
    importerGuidePath,
    importerPackage,
    importersIn,
} from '@/lib/importers';
import { URLS } from '@/lib/urls';
import { Check, ChevronRight, Copy } from '@lucide/vue';
import { useClipboard } from '@vueuse/core';
import { useHead } from '@unhead/vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale, fallbackLocale } = useI18n();

function docsUrl(path: string): string {
    const fallback = String(fallbackLocale.value);
    const prefix = locale.value === fallback ? '' : `/${locale.value}`;
    return `${URLS.docs}${prefix}${path}`;
}

useHead({
    title: computed(() => t('importers.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('importers.meta.description')),
        },
    ],
});

const groups = computed(() =>
    IMPORTER_GROUP_ORDER.map((group) => ({
        key: group,
        items: importersIn(group).map((importer) => ({
            ...importer,
            install: `npm install ${importerPackage(importer.slug)}`,
        })),
    })),
);

// One clipboard instance for all eight cards, so `copied` is shared — `copiedSlug` is
// what keeps the confirmation on the button that was actually pressed. The watcher
// clears it when useClipboard's own timer expires, so the two never drift apart.
const { copy, copied, isSupported } = useClipboard();
const copiedSlug = ref<string | null>(null);

function copyInstall(slug: string, command: string): void {
    copy(command);
    copiedSlug.value = slug;
}

watch(copied, (isCopied) => {
    if (!isCopied) {
        copiedSlug.value = null;
    }
});

// The three claims that hold for all eight, so the page states them once rather than
// per card. Each is checkable: every package declares `"license": "MIT"`, each ships
// as its own entry under `packages/import-*` with no dependency on the editor, and
// every converter returns `{ content, report }` (import-stripo re-exports the type
// from import-html). `runtime` is checkable too: no importer source touches a DOM
// global or a Node-only API, their only runtime deps are `@templatical/types` and
// isomorphic cheerio, and the playground already runs all eight in the browser.
const sharedKeys = ['licence', 'scoped', 'runtime', 'report'] as const;

// Every /alternatives/* page carries a trademark line; this page names six of the same
// products, so it carries one too. Built from IMPORTERS rather than written out, for
// the same reason as every other count on the site — and filtered to `hosted`, because
// HTML and MJML are formats with no owner to attribute.
const trademarkedNames = computed(() =>
    importersIn('hosted')
        .map((importer) => importer.name)
        .join(', '),
);

// The playground callout closes the page, paired with "Something missing" — the two
// next steps for a reader who has been through the cards: try one, or tell us the one
// they needed is absent.
//
// It links to the playground root, not a per-importer URL — the app reads only
// `shadowDom` from the query string, so there is no deep link to point at. The
// playground does lazy-load all eight converters behind a tab per source, which is
// what makes the claim true.
</script>

<template>
    <div>
        <section
            class="relative -mt-21 bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950"
        >
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t('importers.hero.eyebrow') }}</SiteEyebrow>
                        <HeroHeadline
                            :text="t('importers.hero.headline', { count: IMPORTER_COUNT })"
                            as="h1"
                        />
                    </div>
                    <SiteText class="text-pretty">
                        <p>{{ t('importers.hero.subheadline') }}</p>
                    </SiteText>
                </div>
            </SiteContainer>
        </section>

        <!--
            `relative` on the container, not the section: the hero aurora is absolutely
            positioned and bleeds 160px past its own section, so it would otherwise paint
            over the first heading. Positioning the container lifts the content above the
            aurora while leaving the section background beneath it, keeping the bleed.
            Background must stay bg-white/dark:bg-neutral-950 — the colours the aurora's
            fade gradient ends on. See HeroAurora.vue.
        -->
        <section class="bg-white py-16 sm:py-20 dark:bg-neutral-950">
            <SiteContainer class="relative">
                <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div
                        v-for="key in sharedKeys"
                        :key="key"
                        class="flex flex-col gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-800"
                    >
                        <dt class="text-sm/6 font-medium text-neutral-950 dark:text-white">
                            {{ t(`importers.shared.${key}.title`) }}
                        </dt>
                        <dd class="text-sm/6 text-neutral-700 dark:text-neutral-400">
                            {{ t(`importers.shared.${key}.description`) }}
                        </dd>
                    </div>
                </dl>
            </SiteContainer>
        </section>

        <section
            v-for="group in groups"
            :key="group.key"
            class="bg-white py-12 first-of-type:pt-0 sm:py-16 dark:bg-neutral-950"
        >
            <SiteContainer class="flex flex-col gap-8">
                <div class="flex max-w-2xl flex-col gap-2">
                    <h2
                        class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 sm:text-3xl/10 dark:text-white"
                    >
                        {{ t(`importers.groups.${group.key}.title`) }}
                    </h2>
                    <SiteText class="text-pretty">
                        <p>{{ t(`importers.groups.${group.key}.description`) }}</p>
                    </SiteText>
                </div>

                <!-- Custom 1120px breakpoint rather than `lg` (1024px), measured rather
                     than guessed: at exactly 1024 the longest command
                     (import-easy-email-pro) overran a half-width card by 1px. That is
                     invisible but it is a knife edge — a different font fallback turns
                     1px into ten. 1120 buys roughly 45px of headroom. Re-measure if the
                     card padding, the command font size or `npm install` ever change. -->
                <ul class="grid grid-cols-1 gap-4 min-[1120px]:grid-cols-2">
                    <li
                        v-for="importer in group.items"
                        :id="importer.slug"
                        :key="importer.slug"
                        class="flex scroll-mt-24 flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 dark:border-neutral-800 dark:bg-neutral-900/40"
                    >
                        <!-- Name and guide link share the top row, so a card is two
                             rows: who it is for, then how to install it. -->
                        <div class="flex items-center gap-3">
                            <h3
                                class="font-display text-xl/7 tracking-tight text-neutral-950 dark:text-white"
                            >
                                {{ importer.name }}
                            </h3>
                            <SiteButton
                                :href="docsUrl(importerGuidePath(importer.slug))"
                                variant="plain"
                                class="ml-auto shrink-0"
                                external
                            >
                                {{ t('importers.guideCta') }}
                                <ChevronRight class="size-5" />
                            </SiteButton>
                        </div>

                        <!-- Copy lives inside the command box. It is an icon, not the
                             word "Copy", for a layout reason: the text button cost ~65px
                             here, which is what pushed the longest specifier
                             (import-easy-email-pro) past the card edge. The icon costs
                             ~36px and the command fits.

                             The command still scrolls inside its own box — at 375px no
                             layout keeps 45 monospace characters on one line, and
                             scrolling beats wrapping a package name mid-token. -->
                        <div
                            class="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-neutral-950/10 dark:bg-neutral-950 dark:ring-white/10"
                        >
                            <code
                                class="flex-1 overflow-x-auto font-mono text-xs/5 whitespace-nowrap text-neutral-700 dark:text-neutral-300"
                            >
                                <span
                                    class="mr-2 text-neutral-400 select-none dark:text-neutral-600"
                                >$</span>
                                {{ importer.install }}
                            </code>
                            <button
                                v-if="isSupported"
                                type="button"
                                class="shrink-0 rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                                :aria-label="
                                    t('importers.copyAriaLabel', { name: importer.name })
                                "
                                @click="copyInstall(importer.slug, importer.install)"
                            >
                                <Check
                                    v-if="copied && copiedSlug === importer.slug"
                                    class="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                <Copy v-else class="size-4" aria-hidden="true" />
                            </button>
                        </div>
                    </li>
                </ul>
            </SiteContainer>
        </section>

        <section class="bg-white py-16 sm:py-24 dark:bg-neutral-950">
            <SiteContainer class="flex flex-col gap-12">
                <div
                    class="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t('importers.playground.eyebrow') }}</SiteEyebrow>
                        <h2
                            class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 sm:text-3xl/10 dark:text-white"
                        >
                            {{ t('importers.playground.headline') }}
                        </h2>
                        <p class="max-w-xl text-base/7 text-neutral-700 dark:text-neutral-400">
                            {{
                                t('importers.playground.description', {
                                    count: IMPORTER_COUNT,
                                })
                            }}
                        </p>
                    </div>
                    <div class="sm:shrink-0">
                        <SiteButton :href="URLS.playground" variant="plain" external>
                            {{ t('importers.playground.cta') }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                </div>

                <div
                    class="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t('importers.missing.eyebrow') }}</SiteEyebrow>
                        <h2
                            class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 sm:text-3xl/10 dark:text-white"
                        >
                            {{ t('importers.missing.headline') }}
                        </h2>
                        <p class="max-w-xl text-base/7 text-neutral-700 dark:text-neutral-400">
                            {{ t('importers.missing.description') }}
                        </p>
                    </div>
                    <div class="sm:shrink-0">
                        <SiteButton :href="URLS.discussions" variant="plain" external>
                            {{ t('importers.missing.cta') }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                </div>

                <!--
                    No dated version pin here, unlike /alternatives/*: this page no longer
                    describes anyone else's export format, so it carries no claim that can
                    expire when a vendor changes theirs. The "tell us if it broke" line
                    stays — a converter can still fall behind its source editor, and that
                    is the part no build step can catch.
                -->
                <div
                    class="flex max-w-3xl flex-col gap-3 border-t border-neutral-200 pt-8 text-xs/5 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                >
                    <p>{{ t('importers.footnote.freshness') }}</p>
                    <p>
                        {{
                            t('importers.footnote.trademark', {
                                products: trademarkedNames,
                            })
                        }}
                    </p>
                </div>
            </SiteContainer>
        </section>
    </div>
</template>
