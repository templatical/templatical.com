<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AppLogoIcon from './AppLogoIcon.vue';
import SiteContainer from './SiteContainer.vue';
import GithubIcon from './icons/GithubIcon.vue';

const { t } = useI18n();

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

interface FooterGroup {
    key: string;
    heading: string;
    links: FooterLink[];
}

// Grouped rather than one flat row so the comparison pages have a column of
// their own to grow into — /alternatives/beefree and /alternatives/unlayer are
// the next two, and a flat list would have buried them among the docs links.
const groups = computed<FooterGroup[]>(() => [
    {
        key: 'product',
        heading: t('footer.groups.product'),
        links: [
            { label: t('footer.features'), href: '/features' },
            { label: t('footer.importers'), href: '/importers' },
            { label: t('footer.playground'), href: URLS.playground, external: true },
        ],
    },
    {
        key: 'resources',
        heading: t('footer.groups.resources'),
        links: [
            { label: t('footer.documentation'), href: URLS.docs, external: true },
            { label: t('footer.faq'), href: '/faq' },
            { label: t('footer.changelog'), href: '/changelog' },
            { label: t('footer.github'), href: URLS.github, external: true },
        ],
    },
    {
        key: 'compare',
        heading: t('footer.groups.compare'),
        links: [
            { label: t('footer.comparisonBeefree'), href: '/alternatives/beefree' },
            { label: t('footer.comparisonUnlayer'), href: '/alternatives/unlayer' },
            { label: t('footer.comparisonStripo'), href: '/alternatives/stripo' },
            { label: t('footer.comparisonTopol'), href: '/alternatives/topol' },
            { label: t('footer.comparisonChamaileon'), href: '/alternatives/chamaileon' },
            { label: t('footer.comparisonGrapesjs'), href: '/alternatives/grapesjs' },
            { label: t('footer.comparison'), href: '/alternatives/easy-email-pro' },
        ],
    },
]);

const socialLinks = [
    { label: 'GitHub', href: URLS.github, icon: GithubIcon },
];
</script>

<template>
    <footer class="border-t border-neutral-200 dark:border-neutral-800">
        <SiteContainer class="flex flex-col gap-8 py-12">
            <div class="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
                <router-link
                    to="/"
                    class="inline-flex items-center gap-2 self-start"
                >
                    <AppLogoIcon class="size-7" />
                    <span
                        class="text-sm font-semibold text-neutral-950 dark:text-white"
                    >
                        Templatical
                    </span>
                </router-link>

                <nav
                    :aria-label="t('a11y.footerNav')"
                    class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12"
                >
                    <div v-for="group in groups" :key="group.key" class="flex flex-col gap-3">
                        <h2
                            class="text-xs/5 font-medium tracking-wide text-neutral-950 uppercase dark:text-white"
                        >
                            {{ group.heading }}
                        </h2>
                        <ul class="flex flex-col gap-2 text-sm/6">
                            <li v-for="link in group.links" :key="link.href">
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
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div
                class="flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center dark:border-neutral-800"
            >
                <div class="text-sm/7 text-neutral-600 dark:text-neutral-400">
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
                        <component :is="social.icon" class="size-5" />
                    </a>
                </div>
            </div>
        </SiteContainer>
    </footer>
</template>
