<script setup lang="ts">
import ComparisonSection from '@/components/ComparisonSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import HomeCloseSection from '@/components/HomeCloseSection.vue';
import HomeFaqSection from '@/components/HomeFaqSection.vue';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead({
    title: computed(() => t('home.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('home.meta.description')),
        },
    ],
});
</script>

<template>
    <div>
        <HeroSection />

        <ComparisonSection />

        <HomeFaqSection />

        <HomeCloseSection />
    </div>
</template>
