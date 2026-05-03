<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { URLS } from '@/lib/urls';
import { Check, ChevronRight, Plus, X } from 'lucide-vue-next';
import RevealOnScroll from './RevealOnScroll.vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const { t, tm } = useI18n();

type Slug = 'diy' | 'hosted' | 'templatical';

const columns: { slug: Slug; highlight: boolean }[] = [
    { slug: 'diy', highlight: false },
    { slug: 'templatical', highlight: true },
    { slug: 'hosted', highlight: false },
];

function listAt(path: string): string[] {
    return tm(path) as string[];
}

function trailingLabel(slug: Slug): string {
    if (slug === 'diy') return t('home.comparison.youBuildLabel');
    if (slug === 'hosted') return t('home.comparison.paywalledLabel');
    return '';
}
</script>

<template>
    <section class="bg-neutral-50 py-20 sm:py-28 dark:bg-neutral-900">
        <SiteContainer class="flex flex-col gap-12 sm:gap-16">
            <div class="mx-auto flex max-w-2xl flex-col gap-4 text-center">
                <SiteEyebrow>{{ t('home.comparison.eyebrow') }}</SiteEyebrow>
                <SiteSubheading>{{ t('home.comparison.headline') }}</SiteSubheading>
                <SiteText class="text-pretty">
                    <p>{{ t('home.comparison.subheadline') }}</p>
                </SiteText>
            </div>

            <RevealOnScroll>
                <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    <div
                        v-for="col in columns"
                        :key="col.slug"
                        :aria-current="col.highlight ? 'true' : undefined"
                        :class="[
                            'relative flex flex-col gap-6 rounded-2xl p-6 sm:p-8',
                            col.highlight
                                ? 'bg-white ring-2 ring-primary lg:-translate-y-2 dark:bg-neutral-950'
                                : 'bg-white ring-1 ring-neutral-950/5 dark:bg-neutral-950 dark:ring-white/10',
                        ]"
                    >
                        <div class="flex flex-col gap-2">
                            <h3
                                :class="[
                                    'font-display text-xl tracking-tight sm:text-2xl',
                                    col.highlight
                                        ? 'text-primary'
                                        : 'text-neutral-950 dark:text-white',
                                ]"
                            >
                                <span v-if="col.highlight" class="sr-only">{{ t('home.comparison.recommendedLabel') }} —</span>
                                {{ t(`home.comparison.columns.${col.slug}.title`) }}
                            </h3>
                            <p class="text-sm/6 text-pretty text-neutral-700 dark:text-neutral-300">
                                {{ t(`home.comparison.columns.${col.slug}.description`) }}
                            </p>
                        </div>

                        <template v-if="col.slug === 'templatical'">
                            <div class="flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                                <h4 class="text-xs/5 font-medium tracking-wide text-primary uppercase">
                                    {{ t('home.comparison.sdkLabel') }}
                                </h4>
                                <ul class="flex flex-col gap-2.5">
                                    <li
                                        v-for="item in listAt('home.comparison.columns.templatical.sdk')"
                                        :key="item"
                                        class="flex gap-2.5 text-sm/6 text-neutral-800 dark:text-neutral-200"
                                    >
                                        <Check
                                            :stroke-width="2.25"
                                            class="mt-0.5 size-4 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                                <div class="flex flex-wrap items-center gap-2">
                                    <h4 class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                        {{ t('home.comparison.cloudLabel') }}
                                    </h4>
                                    <span class="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px]/4 font-semibold tracking-wide text-amber-900 uppercase dark:bg-amber-500/15 dark:text-amber-300">
                                        {{ t('home.comparison.cloudBadge') }}
                                    </span>
                                </div>
                                <ul class="flex flex-col gap-2.5">
                                    <li
                                        v-for="item in listAt('home.comparison.columns.templatical.cloud')"
                                        :key="item"
                                        class="flex gap-2.5 text-sm/6 text-neutral-700 dark:text-neutral-300"
                                    >
                                        <Plus
                                            :stroke-width="2.25"
                                            class="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                                            aria-hidden="true"
                                        />
                                        {{ item }}
                                    </li>
                                </ul>
                                <a
                                    :href="URLS.cloud"
                                    target="_blank"
                                    rel="noopener"
                                    class="inline-flex items-center gap-1 self-start text-xs/5 font-medium text-amber-700 hover:underline dark:text-amber-300"
                                >
                                    {{ t('home.comparison.cloudMore') }}
                                    <ChevronRight class="size-3.5" />
                                </a>
                            </div>
                        </template>

                        <template v-else>
                            <div class="flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                                <h4 class="text-xs/5 font-medium tracking-wide text-rose-600 uppercase dark:text-rose-400">
                                    {{ trailingLabel(col.slug) }}
                                </h4>
                                <ul class="flex flex-col gap-2.5">
                                    <li
                                        v-for="item in listAt(`home.comparison.columns.${col.slug}.tradeOffs`)"
                                        :key="item"
                                        class="flex gap-2.5 text-sm/6 text-neutral-600 dark:text-neutral-400"
                                    >
                                        <X
                                            :stroke-width="2.25"
                                            class="mt-0.5 size-4 shrink-0 text-rose-500/70 dark:text-rose-400/70"
                                            aria-hidden="true"
                                        />
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </div>
                </div>
            </RevealOnScroll>
        </SiteContainer>
    </section>
</template>
