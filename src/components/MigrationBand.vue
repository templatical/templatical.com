<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { URLS } from '@/lib/urls';
import { ChevronRight } from 'lucide-vue-next';
import SiteContainer from './SiteContainer.vue';

const { t } = useI18n();

const sources = [
    {
        labelKey: 'home.migration.fromBeefree',
        href: `${URLS.docs}/guide/migration-from-beefree`,
    },
    {
        labelKey: 'home.migration.fromUnlayer',
        href: `${URLS.docs}/guide/migration-from-unlayer`,
    },
];
</script>

<template>
    <div class="bg-white py-8 dark:bg-neutral-950">
        <SiteContainer>
            <div
                class="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
                <span class="text-neutral-700 dark:text-neutral-300">
                    {{ t('home.migration.text') }}
                </span>
                <span
                    :aria-label="t('home.migration.sourcesLabel')"
                    class="ml-auto inline-flex flex-wrap items-center gap-2"
                >
                    <a
                        v-for="source in sources"
                        :key="source.href"
                        :href="source.href"
                        target="_blank"
                        rel="noopener"
                        class="group inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1 font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                        {{ t(source.labelKey) }}
                        <ChevronRight
                            class="size-3.5 transition-transform group-hover:translate-x-0.5"
                        />
                    </a>
                </span>
            </div>
        </SiteContainer>
    </div>
</template>
