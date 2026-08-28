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
    'hosting',
    'activation',
    'savedBlocks',
    'htmlImport',
    'source',
    'licence',
    'assets',
    'scope',
    'output',
] as const;

// `output` is the format-portability argument and belongs on this page but NOT on the
// Easy Email Pro one — that product is built on MJML too, so its comparison table shows
// parity on output. It applies to Unlayer for the same reason it applies here: their
// template is a proprietary JSON rendered to HTML by their own engine.
const US_KEYS = ['cost', 'runtime', 'ownership', 'source', 'output'] as const;

// All five are structural, so none of them expires on us: scope (we are email-only by
// choice), who operates the editor, a template catalog we do not sell, a file manager we
// do not ship, and a paid support contract we do not offer. Nothing here is a feature we
// might ship and then forget to remove — the failure mode this list is written to avoid.
//
// Keep this the same length as US_KEYS. The section carries the UWG §6 balance, and an
// uneven split reads as a scorecard rather than as a decision aid — so a new reason on
// one side needs a real one on the other, never padding.
const THEM_KEYS = ['scope', 'operated', 'catalog', 'files', 'support'] as const;

const SOURCES = [
    { label: 'developers.beefree.io', href: URLS.beefreePricing },
    { label: 'docs.beefree.io', href: URLS.beefreeAuthDocs },
    { label: 'docs: custom file picker', href: URLS.beefreeFilePickerDocs },
    { label: 'npm: @beefree.io/sdk', href: URLS.beefreeNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.beefree"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <!-- The reason this page closes differently to the Easy Email Pro one: we ship
             an MIT converter for BeeFree templates, so the page can end in a migration
             path rather than an argument. -->
        <template #migration>
            <SiteButton
                :href="localizedUrl('beefreeMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.beefree.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
