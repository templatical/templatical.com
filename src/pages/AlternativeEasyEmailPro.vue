<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import { URLS } from '@/lib/urls';

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

// No migration slot: there is no `@templatical/import-easy-email-pro` yet. Add one
// here — and a `migration` key to both locales — once the converter and its docs page
// ship, matching the BeeFree and Unlayer pages.
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
    />
</template>
