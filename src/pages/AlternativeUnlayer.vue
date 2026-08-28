<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import SiteButton from '@/components/SiteButton.vue';
import { URLS, localizedUrl } from '@/lib/urls';
import { ChevronRight } from '@lucide/vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const ROW_KEYS = [
    'pricing',
    'domains',
    'customTools',
    'savedBlocks',
    'whiteLabel',
    'hosting',
    'activation',
    'source',
    'licence',
    'scope',
    'amp',
    'output',
] as const;

// `output` (MJML portability) applies here for the same reason it applies to BeeFree
// and NOT to Easy Email Pro: an Unlayer template is their own design JSON rendered by
// their engine, where Easy Email Pro is built on MJML like we are.
const US_KEYS = ['cost', 'extensibility', 'ownership', 'output', 'source'] as const;

// All five are structural. Note `scope` and `amp` also appear as table rows where the
// competitor wins — that is deliberate: a table that never concedes a row reads as a
// scorecard, and this comparison genuinely has two.
//
// Keep this the same length as US_KEYS — see the note in AlternativeBeefree.vue.
const THEM_KEYS = ['scope', 'operated', 'amp', 'tooling', 'support'] as const;

const SOURCES = [
    { label: 'unlayer.com/pricing', href: URLS.unlayerPricing },
    { label: 'docs.unlayer.com', href: URLS.unlayerDocs },
    { label: 'npm: react-email-editor', href: URLS.unlayerNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.unlayer"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <!-- Unlike the Easy Email Pro page, this converter already exists and ships,
             so there is no deploy-order dependency on this CTA. -->
        <template #migration>
            <SiteButton
                :href="localizedUrl('unlayerMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.unlayer.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
