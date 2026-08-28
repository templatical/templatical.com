<script setup lang="ts">
import ComparisonSection from '@/components/ComparisonSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import HomeAiSkillSection from '@/components/HomeAiSkillSection.vue';
import HomeCloseSection from '@/components/HomeCloseSection.vue';
import HomeIndependenceSection from '@/components/HomeIndependenceSection.vue';
import MigrationBand from '@/components/MigrationBand.vue';
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

        <HomeAiSkillSection />

        <ComparisonSection />

        <HomeIndependenceSection />

        <MigrationBand />

        <HomeCloseSection />
    </div>
</template>
