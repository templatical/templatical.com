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
    'users',
    'exports',
    'mount',
    'activation',
    'whiteLabel',
    'headless',
    'source',
    'licence',
    'output',
] as const;

// `mount` is specific to this comparison: Chamaileon is the only one of the five that
// runs the editor inside an iframe it serves, rather than loading a script into your
// page. That is what makes theming and DOM access a real difference here and not just
// a hosting detail.
const US_KEYS = ['metering', 'mount', 'ownership', 'output', 'source'] as const;

// Every entry here is verified against their own SDK page or docs. Two earlier ones
// were not and were removed: a "review and approval workflow" that does not exist —
// their six plugins are editor, preview, thumbnail, gallery, variable editor and HTML
// import, with no review among them — and a template library they never advertise.
// Do not reinstate either without a source.
//
// Keep this the same length as US_KEYS — see the note in AlternativeBeefree.vue.
const THEM_KEYS = ['modular', 'brand', 'gallery', 'operated', 'support'] as const;

const SOURCES = [
    { label: 'chamaileon.io/sdk', href: URLS.chamaileonSdk },
    { label: 'npm: @chamaileon-sdk/plugins', href: URLS.chamaileonNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.chamaileon"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <template #migration>
            <SiteButton
                :href="localizedUrl('chamaileonMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.chamaileon.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
