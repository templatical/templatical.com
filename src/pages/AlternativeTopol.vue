<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import { URLS } from '@/lib/urls';

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

// No migration slot: there is no `@templatical/import-topol`.
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
    />
</template>
