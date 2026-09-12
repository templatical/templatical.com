<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import SiteButton from '@/components/SiteButton.vue';
import { URLS, localizedUrl } from '@/lib/urls';
import { ChevronRight } from '@lucide/vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const ROW_KEYS = [
    'pricing',
    'users',
    'domains',
    'hosting',
    'activation',
    'whiteLabel',
    'customBlocks',
    'storage',
    'frameworks',
    'source',
    'licence',
    'output',
] as const;

const US_KEYS = ['cost', 'domains', 'ownership', 'output', 'source'] as const;

// `comments` is the one perishable entry here: our Cloud tier plans commenting, so if
// that ships, this reason stops being true and the page needs editing in the same
// change. The other four are structural — infrastructure, storage and support we do
// not offer, and a template library we do not curate.
//
// Keep this the same length as US_KEYS — see the note in AlternativeBeefree.vue.
const THEM_KEYS = ['operated', 'storage', 'comments', 'templates', 'support'] as const;

const SOURCES = [
    { label: 'topol.io/tariff-plugin', href: URLS.topolPluginPricing },
    { label: 'topol.io/plugin', href: URLS.topolPlugin },
    { label: 'npm: @topol.io/editor', href: URLS.topolNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.topol"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <template #migration>
            <SiteButton
                :href="localizedUrl('topolMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.topol.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
