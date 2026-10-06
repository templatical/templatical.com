<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import { useViewTransitions } from '@/composables/useViewTransitions';
import { SITE_ORIGIN } from '@/lib/seo';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useViewTransitions();

const OG_IMAGE = `${SITE_ORIGIN}/og.png`;

// Site-wide head tags. Pages add their title, description and canonical
// through usePageMeta, and index.html carries none of these, so unhead is the
// only writer and deduplicates every tag in one place.
useHead({
    meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: OG_IMAGE },
    ],
});
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
            {{ t('a11y.skipToContent') }}
        </a>

        <TheNavbar class="vt-navbar" />

        <main id="main-content" class="vt-main">
            <router-view />
        </main>

        <TheFooter class="vt-footer" />
    </div>
</template>
