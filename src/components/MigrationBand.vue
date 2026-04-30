<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { URLS } from '@/lib/urls';
import { ChevronRight } from 'lucide-vue-next';
import SiteContainer from './SiteContainer.vue';

const { t } = useI18n();

const guidesUrl = `${URLS.docs}/guide/migration-from-beefree`;
</script>

<template>
    <div class="bg-white py-8 dark:bg-neutral-950">
        <SiteContainer>
            <a
                :href="guidesUrl"
                target="_blank"
                rel="noopener"
                class="group flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
            >
                <span class="text-neutral-700 dark:text-neutral-300">
                    {{ t('home.migration.text') }}
                </span>
                <span
                    class="font-mono text-xs/5 text-neutral-500 dark:text-neutral-400"
                >
                    {{ t('home.migration.sources') }}
                </span>
                <span
                    class="ml-auto inline-flex items-center gap-1 font-medium text-neutral-900 group-hover:underline dark:text-white"
                >
                    {{ t('home.migration.cta') }}
                    <ChevronRight class="size-4" />
                </span>
            </a>
        </SiteContainer>
    </div>
</template>
