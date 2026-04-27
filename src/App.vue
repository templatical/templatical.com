<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import { useViewTransitions } from '@/composables/useViewTransitions';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useViewTransitions();
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
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
