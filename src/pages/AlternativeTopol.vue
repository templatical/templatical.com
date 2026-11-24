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
    'languages',
    'source',
    'licence',
    'output',
] as const;

const US_KEYS = ['cost', 'domains', 'ownership', 'output', 'source'] as const;

// Keep this the same length as US_KEYS for a balanced comparison.
const THEM_KEYS = ['operated', 'storage', 'comments', 'templates', 'support'] as const;

const SOURCES = [
    { label: 'topol.io/plugin', href: URLS.topolPlugin },
    { label: 'npm: @topol.io/editor', href: URLS.topolNpm },
    { label: 'docs.topol.io: multilingual templates', href: URLS.topolMultilingualDocs },
    { label: 'docs.topol.io: template translation', href: URLS.topolTranslationDocs },
    { label: 'topol.io/pricing', href: URLS.topolPricing },
    { label: 'docs.topol.io: custom blocks', href: URLS.topolCustomBlockDocs },
    { label: 'docs.topol.io: JS frameworks', href: URLS.topolFrameworkDocs },
    { label: 'docs.topol.io: FAQ', href: URLS.topolFaqDocs },
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
            <SiteButton :href="localizedUrl('topolMigrationDocs', locale)" variant="plain" external>
                {{ t('alternatives.topol.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
