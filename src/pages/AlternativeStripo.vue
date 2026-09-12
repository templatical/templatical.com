<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import SiteButton from '@/components/SiteButton.vue';
import { URLS, localizedUrl } from '@/lib/urls';
import { ChevronRight } from '@lucide/vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const ROW_KEYS = [
    'pricing',
    'metering',
    'overage',
    'branding',
    'customBlocks',
    'storage',
    'hosting',
    'source',
    'licence',
    'support',
    'output',
] as const;

const US_KEYS = ['metering', 'cost', 'ownership', 'output', 'source'] as const;

// All five are structural: a template library we do not curate, infrastructure we do
// not run, AMP and interactive modules we have no plans for, bundled image editing we
// do not ship, and a paid support channel we do not offer.
//
// Keep this the same length as US_KEYS — see the note in AlternativeBeefree.vue.
const THEM_KEYS = ['templates', 'operated', 'modules', 'tooling', 'support'] as const;

const SOURCES = [
    { label: 'stripo.email/plugin', href: URLS.stripoPlugin },
    { label: 'support.stripo.email: plan comparison', href: URLS.stripoPlanComparison },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.stripo"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <template #migration>
            <SiteButton
                :href="localizedUrl('stripoMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.stripo.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
