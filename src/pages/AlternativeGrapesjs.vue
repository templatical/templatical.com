<script setup lang="ts">
import AlternativePage from '@/components/AlternativePage.vue';
import SiteButton from '@/components/SiteButton.vue';
import { URLS, localizedUrl } from '@/lib/urls';
import { ChevronRight } from '@lucide/vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// This page is deliberately shaped differently from the commercial ones. GrapesJS is
// BSD-3-Clause, free, self-hosted, fully public, and can emit MJML through
// grapesjs-mjml — so cost, licence, hosting, source access and output are all ties or
// losses for us. The first four rows state those ties outright instead of quietly
// omitting them; a reader who checks and finds a stacked deck stops trusting the rest
// of the page, and this is the one audience most likely to check.
//
// There is deliberately no `activation` row. It is our strongest column on every other
// comparison and a meaningless tie here, so including it would be padding.
const ROW_KEYS = [
    'cost',
    'licence',
    'runs',
    'source',
    'builtFor',
    'emailSupport',
    'output',
    'mergeTags',
    'conditions',
    'savedBlocks',
    'testSend',
    'linting',
    'clientCompat',
] as const;

// Note there is no email-client-compatibility reason here, and the table row for it
// states a tie. Both projects compile through MJML — Templatical natively, GrapesJS via
// grapesjs-mjml — so the same compiler produces the same client-safe HTML. Claiming
// Outlook and Gmail handling as ours alone would contradict this page's own
// `emailSupport` row, which already names grapesjs-mjml as the maintained path.
const US_KEYS = ['purpose', 'features', 'previews', 'dropIn', 'defaults'] as const;

// `licence` is the notable one: BSD-3-Clause genuinely beats FSL-1.1-MIT today — no
// non-compete restriction, no two-year wait. It is conceded in both the table and here
// rather than argued around. All five are structural and none can expire.
//
// Keep this the same length as US_KEYS — see the note in AlternativeBeefree.vue.
const THEM_KEYS = ['scope', 'freedom', 'licence', 'control', 'reuse'] as const;

const SOURCES = [
    { label: 'grapesjs.com', href: URLS.grapesjsSite },
    { label: 'npm: grapesjs', href: URLS.grapesjsNpm },
    { label: 'npm: grapesjs-mjml', href: URLS.grapesjsMjmlNpm },
];
</script>

<template>
    <AlternativePage
        ns="alternatives.grapesjs"
        :row-keys="ROW_KEYS"
        :us-keys="US_KEYS"
        :them-keys="THEM_KEYS"
        :sources="SOURCES"
    >
        <!-- Not an importer, unlike the BeeFree and Unlayer pages: a grapesjs-mjml setup
             already emits MJML, which Templatical works in natively. The MJML guide is
             the honest path rather than a converter we do not ship. -->
        <template #migration>
            <SiteButton
                :href="localizedUrl('mjmlMigrationDocs', locale)"
                variant="plain"
                external
            >
                {{ t('alternatives.grapesjs.migration.label') }}
                <ChevronRight class="size-5" />
            </SiteButton>
        </template>
    </AlternativePage>
</template>
