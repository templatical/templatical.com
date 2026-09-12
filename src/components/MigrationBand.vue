<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ChevronRight } from '@lucide/vue';
import { IMPORTER_COUNT } from '@/lib/importers';
import SiteContainer from './SiteContainer.vue';

const { t } = useI18n();

// Deliberately a count and one link, not a chip per importer. /importers owns the
// list; the previous version repeated three names here and silently understated us by
// five when the rest shipped. The count is interpolated rather than written into the
// copy, so a ninth converter needs no edit in either locale.
</script>

<template>
    <div class="bg-white py-8 dark:bg-neutral-950">
        <SiteContainer>
            <div
                class="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
                <span class="text-neutral-700 dark:text-neutral-300">
                    {{ t('home.migration.text', { count: IMPORTER_COUNT }) }}
                </span>
                <router-link
                    to="/importers"
                    class="group ml-auto inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1 font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                >
                    {{ t('home.migration.cta') }}
                    <ChevronRight
                        class="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
                    />
                </router-link>
            </div>
        </SiteContainer>
    </div>
</template>
