<script setup lang="ts">
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import RevealOnScroll from '@/components/RevealOnScroll.vue';
import SiteButton from '@/components/SiteButton.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteSubheading from '@/components/SiteSubheading.vue';
import SiteText from '@/components/SiteText.vue';
import { URLS } from '@/lib/urls';
import { Check, ChevronRight } from '@lucide/vue';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Shared layout for every `/alternatives/*` page. Extracted rather than copied
 * because this markup encodes three fixes that are invisible in review and easy to
 * lose in a duplicate:
 *
 *  1. The post-hero section MUST be `bg-white dark:bg-neutral-950` with `relative` on
 *     its container — HeroAurora is `-bottom-40`, so it bleeds 160px down and, being
 *     absolutely positioned, paints over this section's heading. See HeroAurora.vue.
 *  2. The comparison renders as a table at `md`+ and as stacked cards below it. A
 *     single scrolling table clipped the Templatical column — the one the page exists
 *     to show — at any width under ~800px.
 *  3. Exactly one RevealOnScroll, matching every other section on the site. Three
 *     staggered reveals read as choppy against the rest of the pages.
 */
const props = defineProps<{
    /** i18n namespace, e.g. `alternatives.easyEmailPro`. */
    ns: string;
    /** Comparison row order. Fixed in code, not read from the message object: `tm()`
     *  on a nested structure returns compiled message functions rather than plain
     *  strings (the repo's Faq.vue pattern), and it keeps ordering out of
     *  translators' hands. */
    rowKeys: readonly string[];
    /** Reasons to choose Templatical. */
    usKeys: readonly string[];
    /** Reasons to choose the competitor. Prefer STRUCTURAL reasons (hosting model,
     *  framework stance, cost model) over feature checkboxes — a feature we later
     *  ship silently makes this page understate us, and nothing will remind you. */
    themKeys: readonly string[];
    /** Footnote source links: what every competitor claim was taken from. */
    sources: readonly { label: string; href: string }[];
}>();

const { t } = useI18n();
const k = (suffix: string) => `${props.ns}.${suffix}`;

useHead({
    title: computed(() => t(k('meta.title'))),
    meta: [{ name: 'description', content: computed(() => t(k('meta.description'))) }],
});

const rows = computed(() =>
    props.rowKeys.map((key) => ({
        key,
        label: t(k(`table.rows.${key}.label`)),
        them: t(k(`table.rows.${key}.them`)),
        us: t(k(`table.rows.${key}.us`)),
    })),
);

const usReasons = computed(() =>
    props.usKeys.map((key) => ({ key, text: t(k(`bestFit.us.${key}`)) })),
);
const themReasons = computed(() =>
    props.themKeys.map((key) => ({ key, text: t(k(`bestFit.them.${key}`)) })),
);
</script>

<template>
    <div>
        <section class="relative -mt-21 bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950">
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t(k('hero.eyebrow')) }}</SiteEyebrow>
                        <HeroHeadline :text="t(k('hero.headline'))" />
                    </div>
                    <SiteText size="lg" class="text-pretty">
                        <p>{{ t(k('hero.subheadline')) }}</p>
                    </SiteText>
                    <div class="flex flex-wrap items-center gap-4">
                        <SiteButton :href="URLS.playground" size="lg" external>
                            {{ t(k('hero.ctaPrimary')) }}
                        </SiteButton>
                        <SiteButton :href="URLS.docs" variant="plain" size="lg" external>
                            {{ t(k('hero.ctaSecondary')) }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                </div>
            </SiteContainer>
        </section>

        <!-- Background and `relative` are load-bearing here — see note 1 in the script. -->
        <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
            <SiteContainer class="relative flex flex-col gap-10">
                <SiteSubheading>{{ t(k('table.heading')) }}</SiteSubheading>

                <table class="hidden w-full border-collapse text-left md:table">
                    <caption class="sr-only">
                        {{
                            t(k('table.heading'))
                        }}
                    </caption>
                    <thead>
                        <tr
                            class="border-b border-neutral-300 text-xs/5 font-medium tracking-wide uppercase dark:border-neutral-700"
                        >
                            <!-- Templatical first, matching this table's own heading
                                 ("Templatical vs X") and the best-fit block below, where
                                 our card is the highlighted one. The three used to
                                 disagree, which made the reader remap column positions
                                 between sections. -->
                            <th
                                scope="col"
                                class="py-3 pr-6 text-neutral-500 dark:text-neutral-400"
                            >
                                {{ t(k('table.colFeature')) }}
                            </th>
                            <th scope="col" class="py-3 pr-6 text-primary">
                                {{ t(k('table.colUs')) }}
                            </th>
                            <th scope="col" class="py-3 text-neutral-500 dark:text-neutral-400">
                                {{ t(k('table.colThem')) }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="row in rows"
                            :key="row.key"
                            class="border-b border-neutral-200 align-top dark:border-neutral-800"
                        >
                            <th
                                scope="row"
                                class="w-1/5 py-4 pr-6 text-sm/6 font-medium text-neutral-950 dark:text-white"
                            >
                                {{ row.label }}
                            </th>
                            <td
                                class="py-4 pr-6 text-sm/6 text-pretty text-neutral-800 dark:text-neutral-200"
                            >
                                {{ row.us }}
                            </td>
                            <td
                                class="py-4 text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400"
                            >
                                {{ row.them }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ul class="flex flex-col gap-4 md:hidden">
                    <li
                        v-for="row in rows"
                        :key="row.key"
                        class="flex flex-col gap-3 rounded-2xl bg-neutral-50 p-5 ring-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-white/10"
                    >
                        <h3 class="text-sm/6 font-medium text-neutral-950 dark:text-white">
                            {{ row.label }}
                        </h3>
                        <!-- Same order as the desktop table: Templatical first. -->
                        <div class="flex flex-col gap-1">
                            <span
                                class="text-xs/5 font-medium tracking-wide text-primary uppercase"
                            >
                                {{ t(k('table.colUs')) }}
                            </span>
                            <p class="text-sm/6 text-pretty text-neutral-800 dark:text-neutral-200">
                                {{ row.us }}
                            </p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span
                                class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
                            >
                                {{ t(k('table.colThem')) }}
                            </span>
                            <p class="text-sm/6 text-pretty text-neutral-600 dark:text-neutral-400">
                                {{ row.them }}
                            </p>
                        </div>
                    </li>
                </ul>
            </SiteContainer>
        </section>

        <!-- Load-bearing, not decoration: the table above runs heavily in our favour, and
             a comparison naming a competitor that acknowledges nothing they do better is
             what invites the "one-sided / denigrating" argument under UWG §6. Framed as
             guidance ("choose them if…") rather than as concession — two earlier shapes
             read wrong, one announcing its own fairness ("The honest part") and one
             titling every item as a negation ("No visual block builder"). -->
        <section class="bg-neutral-50 py-20 sm:py-28 dark:bg-neutral-900">
            <SiteContainer class="flex flex-col gap-12">
                <div class="flex max-w-2xl flex-col gap-4">
                    <SiteEyebrow>{{ t(k('bestFit.eyebrow')) }}</SiteEyebrow>
                    <SiteSubheading>{{ t(k('bestFit.headline')) }}</SiteSubheading>
                    <SiteText class="text-pretty">
                        <p>{{ t(k('bestFit.subheadline')) }}</p>
                    </SiteText>
                </div>

                <RevealOnScroll>
                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div
                            class="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-2 ring-primary sm:p-8 dark:bg-neutral-950"
                        >
                            <h3 class="font-display text-xl tracking-tight text-primary">
                                {{ t(k('bestFit.usTitle')) }}
                            </h3>
                            <ul class="flex flex-col gap-2.5">
                                <li
                                    v-for="reason in usReasons"
                                    :key="reason.key"
                                    class="flex gap-2.5 text-sm/6 text-pretty text-neutral-800 dark:text-neutral-200"
                                >
                                    <Check
                                        :stroke-width="2.25"
                                        class="mt-0.5 size-4 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    {{ reason.text }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-950 dark:ring-white/10"
                        >
                            <h3
                                class="font-display text-xl tracking-tight text-neutral-950 dark:text-white"
                            >
                                {{ t(k('bestFit.themTitle')) }}
                            </h3>
                            <ul class="flex flex-col gap-2.5">
                                <li
                                    v-for="reason in themReasons"
                                    :key="reason.key"
                                    class="flex gap-2.5 text-sm/6 text-pretty text-neutral-700 dark:text-neutral-300"
                                >
                                    <Check
                                        :stroke-width="2.25"
                                        class="mt-0.5 size-4 shrink-0 text-neutral-400 dark:text-neutral-500"
                                        aria-hidden="true"
                                    />
                                    {{ reason.text }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>
            </SiteContainer>
        </section>

        <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
            <SiteContainer class="flex flex-col gap-12">
                <div class="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
                    <SiteSubheading>{{ t(k('close.headline')) }}</SiteSubheading>
                    <SiteText class="text-pretty">
                        <p>{{ t(k('close.body')) }}</p>
                    </SiteText>
                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <SiteButton :href="URLS.playground" size="lg" external>
                            {{ t(k('close.ctaPrimary')) }}
                        </SiteButton>
                        <SiteButton :href="URLS.docs" variant="plain" size="lg" external>
                            {{ t(k('close.ctaSecondary')) }}
                            <ChevronRight class="size-5" />
                        </SiteButton>
                    </div>
                    <!-- Only the pages whose competitor we ship an importer for pass this. -->
                    <slot name="migration" />
                </div>

                <div
                    class="mx-auto flex max-w-3xl flex-col gap-3 border-t border-neutral-200 pt-8 text-xs/5 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                >
                    <p>{{ t(k('footnote.verified')) }}</p>
                    <p>{{ t(k('footnote.notDocumented')) }}</p>
                    <p class="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span class="font-medium">{{ t(k('footnote.sourcesLabel')) }}:</span>
                        <a
                            v-for="source in sources"
                            :key="source.href"
                            :href="source.href"
                            target="_blank"
                            rel="noopener nofollow"
                            class="underline hover:text-neutral-700 dark:hover:text-neutral-200"
                            >{{ source.label }}</a
                        >
                    </p>
                    <p>{{ t(k('footnote.trademark')) }}</p>
                    <p>
                        {{ t(k('footnote.stale')) }}
                        <a
                            :href="URLS.siteIssues"
                            target="_blank"
                            rel="noopener"
                            class="font-medium text-primary hover:underline"
                            >{{ t(k('footnote.staleCta')) }}</a
                        >.
                    </p>
                </div>
            </SiteContainer>
        </section>
    </div>
</template>
