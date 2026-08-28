<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import { URLS } from '@/lib/urls';

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

// No migration slot: there is no `@templatical/import-stripo`. Stripo's plugin outputs
// HTML rather than a documented template JSON, so the closest existing path is the
// generic HTML importer — not specific enough to promise here.
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
    />
</template>
