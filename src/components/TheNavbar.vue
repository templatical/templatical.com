<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { useScrollLock, useToggle, useWindowScroll } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import AppLogoIcon from './AppLogoIcon.vue';
import DarkModeToggle from './DarkModeToggle.vue';
import LocaleSwitcher from './LocaleSwitcher.vue';
import SiteButton from './SiteButton.vue';
import IconGitHub from './icons/IconGitHub.vue';

const { t } = useI18n();
const route = useRoute();
const { y: scrollY } = useWindowScroll();
const hasTransparentHero = computed(() => {
    const path = route.path.replace(/\/$/, '');
    return path === '' || path.endsWith('/features');
});

interface NavLink {
    label: string;
    href: string;
    external?: boolean;
}

const links = computed<NavLink[]>(() => [
    { label: t('nav.features'), href: '/features' },
    { label: t('nav.docs'), href: URLS.docs, external: true },
    { label: t('nav.playground'), href: URLS.playground, external: true },
]);

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = useToggle(isMobileMenuOpen);
const solid = computed(
    () =>
        !hasTransparentHero.value ||
        scrollY.value > 40 ||
        isMobileMenuOpen.value,
);
const menuRef = ref<HTMLElement | null>(null);
const menuTriggerRef = ref<HTMLElement | null>(null);
const bodyScrollLock = useScrollLock(
    computed(() => (typeof document !== 'undefined' ? document.body : null)),
);
const { activate: activateTrap, deactivate: deactivateTrap } = useFocusTrap(
    menuRef,
    { immediate: false },
);

watch(isMobileMenuOpen, async (open) => {
    if (open) {
        bodyScrollLock.value = true;
        await nextTick();
        activateTrap();
    } else {
        deactivateTrap();
        bodyScrollLock.value = false;
        menuTriggerRef.value?.focus();
    }
});

const linkClasses =
    'text-3xl/10 font-medium text-neutral-950 transition-colors lg:text-sm/7 lg:text-neutral-600 lg:hover:text-neutral-950 dark:text-white dark:lg:text-neutral-400 dark:lg:hover:text-white';
</script>

<template>
    <header
        :class="[
            'site-nav sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out motion-reduce:transition-none',
            solid
                ? 'border-neutral-200/50 bg-white/80 backdrop-blur-lg dark:border-neutral-800/50 dark:bg-neutral-950/80'
                : 'border-transparent bg-transparent backdrop-blur-0',
        ]"
    >
        <nav :aria-label="t('a11y.mainNav')">
            <div
                class="mx-auto flex h-21 max-w-7xl items-center gap-4 px-6 lg:px-10"
            >
                <div class="flex flex-1 items-center">
                    <router-link to="/" class="inline-flex items-center gap-2">
                        <AppLogoIcon class="size-9" />
                        <span
                            class="text-base font-semibold text-neutral-950 dark:text-white"
                        >
                            Templatical
                        </span>
                    </router-link>
                </div>

                <div class="flex gap-8 max-lg:hidden">
                    <template v-for="link in links" :key="link.href">
                        <a
                            v-if="link.external"
                            :href="link.href"
                            rel="noopener noreferrer"
                            :class="linkClasses"
                        >
                            {{ link.label }}
                        </a>
                        <router-link v-else :to="link.href" :class="linkClasses">
                            {{ link.label }}
                        </router-link>
                    </template>
                </div>

                <div class="flex flex-1 items-center justify-end gap-2">
                    <DarkModeToggle />
                    <LocaleSwitcher />
                    <a
                        :href="URLS.github"
                        rel="noopener noreferrer"
                        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-400 dark:hover:text-white"
                        aria-label="GitHub"
                    >
                        <IconGitHub />
                    </a>
                    <SiteButton
                        :href="URLS.docs"
                        external
                        size="md"
                        class="max-sm:hidden"
                    >
                        {{ t('nav.getStarted') }}
                    </SiteButton>

                    <button
                        ref="menuTriggerRef"
                        :aria-label="t('nav.openMenu')"
                        :aria-expanded="isMobileMenuOpen"
                        class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-950 hover:bg-neutral-950/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none lg:hidden dark:text-white dark:hover:bg-white/10"
                        @click="toggleMobileMenu(true)"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <Teleport to="body">
                <Transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-if="isMobileMenuOpen"
                        ref="menuRef"
                        class="fixed inset-0 z-50 bg-white px-6 py-6 lg:hidden lg:px-10 dark:bg-neutral-950"
                        role="dialog"
                        aria-modal="true"
                        :aria-label="t('a11y.mobileMenu')"
                        @keydown.escape="toggleMobileMenu(false)"
                    >
                        <div class="flex justify-end">
                            <button
                                :aria-label="t('nav.closeMenu')"
                                class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-950 hover:bg-neutral-950/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-white dark:hover:bg-white/10"
                                @click="toggleMobileMenu(false)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="mt-6 flex flex-col gap-6">
                            <template v-for="link in links" :key="link.href">
                                <a
                                    v-if="link.external"
                                    :href="link.href"
                                    rel="noopener noreferrer"
                                    :class="linkClasses"
                                    @click="toggleMobileMenu(false)"
                                >
                                    {{ link.label }}
                                </a>
                                <router-link
                                    v-else
                                    :to="link.href"
                                    :class="linkClasses"
                                    @click="toggleMobileMenu(false)"
                                >
                                    {{ link.label }}
                                </router-link>
                            </template>
                        </div>
                    </div>
                </Transition>
            </Teleport>
        </nav>
    </header>
</template>
