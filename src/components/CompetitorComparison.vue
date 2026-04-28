<script setup lang="ts">
import RevealOnScroll from '@/components/RevealOnScroll.vue';
import SiteButton from '@/components/SiteButton.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import { URLS } from '@/lib/urls';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const competitors = ['beefree', 'unlayer', 'grapesjs'] as const;
type Slug = (typeof competitors)[number];

const migrationPaths: Record<Slug, string> = {
    beefree: '/guide/migration-from-beefree',
    unlayer: '/guide/migration-from-unlayer',
    grapesjs: '/guide/migration-from-mjml',
};

const { t, tm, locale, fallbackLocale } = useI18n();

const active = ref<Slug>('beefree');
const tabRefs = ref<HTMLButtonElement[]>([]);

const activeName = computed(() => t(`home.comparison.tabs.${active.value}.name`));

function docsUrl(path: string): string {
    const fallback = String(fallbackLocale.value);
    const prefix = locale.value === fallback ? '' : `/${locale.value}`;
    return `${URLS.docs}${prefix}${path}`;
}

function onTabKeydown(event: KeyboardEvent, idx: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const dir = event.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + competitors.length) % competitors.length;
    active.value = competitors[next];
    tabRefs.value[next]?.focus();
}
</script>

<template>
    <RevealOnScroll>
        <div class="flex flex-col gap-8">
            <div
                role="tablist"
                :aria-label="t('home.comparison.tabsLabel')"
                class="flex flex-wrap gap-2 self-center rounded-full bg-neutral-100 p-1 ring-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-white/10"
            >
                <button
                    v-for="(slug, idx) in competitors"
                    :key="slug"
                    :ref="(el) => (tabRefs[idx] = el as HTMLButtonElement)"
                    type="button"
                    role="tab"
                    :id="`competitor-tab-${slug}`"
                    :aria-selected="active === slug"
                    :aria-controls="`competitor-panel-${slug}`"
                    :tabindex="active === slug ? 0 : -1"
                    :class="[
                        'inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm/6 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:transition-none',
                        active === slug
                            ? 'bg-white text-neutral-950 shadow-sm dark:bg-neutral-950 dark:text-white'
                            : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white',
                    ]"
                    @click="active = slug"
                    @keydown="onTabKeydown($event, idx)"
                >
                    {{ t(`home.comparison.tabs.${slug}.name`) }}
                </button>
            </div>

            <div
                role="tabpanel"
                :id="`competitor-panel-${active}`"
                :aria-labelledby="`competitor-tab-${active}`"
                :key="active"
                class="flex flex-col gap-8 motion-safe:animate-fade-in"
            >
                <div class="flex flex-col gap-6 rounded-2xl bg-white p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-950 dark:ring-white/10">
                    <p class="text-base/7 text-pretty text-neutral-700 dark:text-neutral-300">
                        {{ t(`home.comparison.tabs.${active}.positioning`) }}
                    </p>
                    <dl class="grid grid-cols-1 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-3 dark:border-neutral-800">
                        <div class="flex flex-col gap-1">
                            <dt class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                {{ t('home.comparison.factsLabels.license') }}
                            </dt>
                            <dd class="text-sm/6 text-neutral-950 dark:text-white">
                                {{ t(`home.comparison.tabs.${active}.facts.license`) }}
                            </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                            <dt class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                {{ t('home.comparison.factsLabels.pricing') }}
                            </dt>
                            <dd class="text-sm/6 text-neutral-950 dark:text-white">
                                {{ t(`home.comparison.tabs.${active}.facts.pricing`) }}
                            </dd>
                        </div>
                        <div class="flex flex-col gap-1">
                            <dt class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                {{ t('home.comparison.factsLabels.selfHost') }}
                            </dt>
                            <dd class="text-sm/6 text-neutral-950 dark:text-white">
                                {{ t(`home.comparison.tabs.${active}.facts.selfHost`) }}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div class="flex flex-col gap-4 rounded-2xl bg-primary/5 p-6 ring-1 ring-primary/20 sm:p-8 dark:bg-primary/10 dark:ring-primary/30">
                        <h3 class="text-sm/6 font-semibold text-primary">
                            {{ t('home.comparison.templaticalWinsLabel') }}
                        </h3>
                        <ul class="flex flex-col gap-3">
                            <li
                                v-for="item in (tm(`home.comparison.tabs.${active}.templaticalWins`) as string[])"
                                :key="item"
                                class="flex gap-3 text-sm/6 text-neutral-800 dark:text-neutral-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="mt-0.5 size-5 shrink-0 text-primary"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <div class="flex flex-col gap-4 rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 sm:p-8 dark:bg-neutral-900 dark:ring-white/10">
                        <h3 class="text-sm/6 font-semibold text-neutral-700 dark:text-neutral-300">
                            {{ t('home.comparison.competitorWinsLabel', { name: activeName }) }}
                        </h3>
                        <ul class="flex flex-col gap-3">
                            <li
                                v-for="item in (tm(`home.comparison.tabs.${active}.competitorWins`) as string[])"
                                :key="item"
                                class="flex gap-3 text-sm/6 text-neutral-800 dark:text-neutral-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="mt-0.5 size-5 shrink-0 text-neutral-500 dark:text-neutral-400"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </svg>
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col gap-5 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-6 sm:p-8 dark:border-neutral-700 dark:bg-neutral-900/50">
                    <div class="flex flex-wrap items-center gap-3">
                        <h3 class="text-sm/6 font-semibold text-neutral-950 dark:text-white">
                            {{ t('home.comparison.cloudSectionLabel') }}
                        </h3>
                        <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs/5 font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                            {{ t('home.comparison.cloudSectionStatus') }}
                        </span>
                    </div>
                    <p class="text-sm/6 text-pretty text-neutral-700 dark:text-neutral-300">
                        {{ t('home.comparison.cloudIntro') }}
                    </p>
                    <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <li
                            v-for="item in (tm('home.comparison.cloudFeatures') as string[])"
                            :key="item"
                            class="flex gap-2 text-sm/6 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                class="mt-0.5 size-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 6v12m6-6H6"
                                />
                            </svg>
                            {{ item }}
                        </li>
                    </ul>
                    <div class="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <p class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            {{ t('home.comparison.cloudVsLabel', { name: activeName }) }}
                        </p>
                        <p class="mt-2 text-sm/6 text-pretty text-neutral-700 dark:text-neutral-300">
                            {{ t(`home.comparison.tabs.${active}.cloudVsCompetitor`) }}
                        </p>
                    </div>
                    <SiteButton
                        :href="URLS.cloud"
                        variant="plain"
                        external
                        class="self-start"
                    >
                        {{ t('home.comparison.cloudLearnMore') }}
                        <IconChevronRight />
                    </SiteButton>
                </div>

                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div class="flex flex-col gap-2">
                        <h4 class="text-xs/5 font-medium tracking-wide text-primary uppercase">
                            {{ t('home.comparison.pickUsLabel') }}
                        </h4>
                        <p class="text-base/7 text-pretty text-neutral-700 dark:text-neutral-300">
                            {{ t(`home.comparison.tabs.${active}.verdict.us`) }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h4 class="text-xs/5 font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            {{ t('home.comparison.pickCompetitorLabel', { name: activeName }) }}
                        </h4>
                        <p class="text-base/7 text-pretty text-neutral-700 dark:text-neutral-300">
                            {{ t(`home.comparison.tabs.${active}.verdict.competitor`) }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-center dark:border-neutral-800">
                    <p class="text-sm/7 font-medium text-primary">
                        {{ t('home.comparison.migrationCta', { name: activeName }) }}
                    </p>
                    <SiteButton
                        :href="docsUrl(migrationPaths[active])"
                        variant="plain"
                        external
                    >
                        {{ t('home.comparison.migrationLink') }}
                        <IconChevronRight />
                    </SiteButton>
                </div>
            </div>
        </div>
    </RevealOnScroll>
</template>
