<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import SiteButton from '@/components/SiteButton.vue';
import { URLS, localizedUrl } from '@/lib/urls';
import { ChevronRight } from '@lucide/vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const ROW_KEYS = [
    'licensing',
    'source',
    'framework',
    'uiFramework',
    'footprint',
    'activation',
    'agents',
    'linting',
    'importers',
    'isolation',
    'output',
] as const;

const US_KEYS = ['framework', 'cost', 'runtime', 'source'] as const;

// Structural where possible. `blockStudio` is the one item here that we could
// plausibly build — ship no-code block authoring and this page needs editing in the
// same change. The rest are stances we've deliberately taken (React-native API,
// AMP, commercial support), so they stay true regardless of what we ship.
const THEM_KEYS = ['react', 'blockStudio', 'amp', 'support'] as const;

const SOURCES = [
    { label: 'easyemail.pro', href: URLS.easyEmailPro },
    { label: 'docs.easyemail.pro', href: URLS.easyEmailProQuickStart },
    { label: 'npm: easy-email-pro-core', href: URLS.easyEmailProNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.easyEmailPro"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <template #migration>
            <SiteButton
                :href="localizedUrl('easyEmailProMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.easyEmailPro.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
