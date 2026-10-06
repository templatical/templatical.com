<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue';
import SiteHeading from '@/components/SiteHeading.vue';
import SiteText from '@/components/SiteText.vue';
import { usePageMeta } from '@/composables/usePageMeta';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

usePageMeta('notFound.meta.title', 'notFound.meta.description', { noindex: true });
</script>

<template>
    <SiteContainer class="py-32 text-center">
        <SiteHeading>{{ t('notFound.headline') }}</SiteHeading>
        <SiteText class="mt-4">{{ t('notFound.body') }}</SiteText>
        <router-link
            to="/"
            class="mt-8 inline-block font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
            {{ t('notFound.home') }}
        </router-link>
    </SiteContainer>
</template>
