<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AppLogoIcon from './AppLogoIcon.vue';
import SiteContainer from './SiteContainer.vue';
import IconGitHub from './icons/IconGitHub.vue';

const { t } = useI18n();

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

const links = computed<FooterLink[]>(() => [
    { label: t('footer.features'), href: '/features' },
    { label: t('footer.community'), href: '/community' },
    { label: t('footer.documentation'), href: URLS.docs, external: true },
    { label: t('footer.playground'), href: URLS.playground, external: true },
    { label: t('footer.github'), href: URLS.github, external: true },
]);

const socialLinks = [
    { label: 'GitHub', href: URLS.github, icon: IconGitHub },
];
</script>

<template>
    <footer class="border-t border-neutral-200 dark:border-neutral-800">
        <SiteContainer class="flex flex-col gap-8 py-12">
            <div
                class="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
            >
                <router-link
                    to="/"
                    class="inline-flex items-center gap-2"
                >
                    <AppLogoIcon class="size-7" />
                    <span
                        class="text-sm font-semibold text-neutral-950 dark:text-white"
                    >
                        Templatical
                    </span>
                </router-link>

                <nav
                    aria-label="Footer"
                    class="flex flex-wrap gap-x-6 gap-y-2 text-sm/7"
                >
                    <template v-for="link in links" :key="link.href">
                        <a
                            v-if="link.external"
                            :href="link.href"
                            rel="noopener noreferrer"
                            class="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                        >
                            {{ link.label }}
                        </a>
                        <router-link
                            v-else
                            :to="link.href"
                            class="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                        >
                            {{ link.label }}
                        </router-link>
                    </template>
                </nav>
            </div>

            <div
                class="flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center dark:border-neutral-800"
            >
                <div class="text-sm/7 text-neutral-500">
                    {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
                </div>
                <div class="flex items-center gap-1">
                    <a
                        v-for="social in socialLinks"
                        :key="social.label"
                        :href="social.href"
                        rel="noopener noreferrer"
                        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:hover:text-white"
                        :aria-label="social.label"
                    >
                        <component :is="social.icon" />
                    </a>
                </div>
            </div>
        </SiteContainer>
    </footer>
</template>
