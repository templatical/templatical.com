<script setup lang="ts">
import ComparisonSection from '@/components/ComparisonSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import HomeAiSkillSection from '@/components/HomeAiSkillSection.vue';
import HomeCloseSection from '@/components/HomeCloseSection.vue';
import HomeIndependenceSection from '@/components/HomeIndependenceSection.vue';
import MigrationBand from '@/components/MigrationBand.vue';
import { usePageMeta } from '@/composables/usePageMeta';
import { SOFTWARE_APPLICATION } from '@/lib/seo';
import { useHead } from '@unhead/vue';

usePageMeta('home.meta.title', 'home.meta.description');

useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(SOFTWARE_APPLICATION) }],
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
