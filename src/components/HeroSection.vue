<script setup lang="ts">
import { URLS, localizedUrl } from '@/lib/urls';
import { useBundleSize } from '@/composables/useBundleSize';
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import GitHubStarButton from './GitHubStarButton.vue';
import HeroAurora from './HeroAurora.vue';
import HeroEditor from './HeroEditor.vue';
import HeroHeadline from './HeroHeadline.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import { ChevronRight } from '@lucide/vue';

const { t, tm, locale } = useI18n();
const heroBadges = computed(() => tm('home.hero.badges') as string[]);
const { label: bundleLabel } = useBundleSize();

// Literal command, not translatable prose: the copy button reproduces it verbatim.
const installCommand = 'npm install @templatical/editor';
const { copy, copied, isSupported } = useClipboard({ source: installCommand });
</script>

<template>
    <section id="hero" class="relative -mt-21 bg-neutral-50 pt-41 sm:pt-53 dark:bg-neutral-950">
        <HeroAurora
            root-class="inset-x-0 top-0 bottom-0"
            fade-class="bg-gradient-to-b from-transparent from-55% to-neutral-50 dark:to-neutral-950"
        />

        <SiteContainer class="relative flex flex-col items-center gap-8 text-center">
            <GitHubStarButton
                class="motion-safe:animate-fade-in motion-safe:[animation-delay:50ms]"
            />
            <HeroHeadline :text="t('home.hero.headline')" class="hero-headline max-w-4xl" />
            <div
                class="flex max-w-2xl flex-col gap-4 text-lg/8 text-neutral-600 motion-safe:animate-fade-in motion-safe:[animation-delay:200ms] dark:text-neutral-400"
            >
                <p>{{ t('home.hero.subheadline') }}</p>
                <p>{{ t('home.hero.backendNote') }}</p>
            </div>
        </SiteContainer>

        <SiteContainer class="relative mt-12">
            <!-- No transform-based entrance (animate-scale-in / animate-fade-in
                 both animate `transform`): a transform here makes the wrapper a
                 containing block for the embedded editor's `fixed` overlays and
                 drag ghost. The scroll-driven opacity parallax below is the only
                 motion on this wrapper. -->
            <div class="hero-editor-wrap">
                <HeroEditor />
            </div>
        </SiteContainer>

        <SiteContainer
            class="relative mt-12 flex flex-col items-center gap-8 pb-20 text-center sm:pb-28"
        >
            <div
                class="flex flex-wrap items-center justify-center gap-4 motion-safe:animate-fade-in motion-safe:[animation-delay:400ms]"
            >
                <SiteButton :href="URLS.playground" size="lg" external>
                    {{ t('home.hero.ctaPrimary') }}
                </SiteButton>
                <SiteButton
                    :href="localizedUrl('installation', locale)"
                    variant="plain"
                    size="lg"
                    external
                >
                    {{ t('home.hero.ctaSecondary') }}
                    <ChevronRight class="size-5" />
                </SiteButton>
            </div>
            <div
                class="w-full max-w-xl overflow-hidden rounded-xl bg-white text-left ring-1 ring-neutral-950/10 motion-safe:animate-fade-in motion-safe:[animation-delay:400ms] dark:bg-neutral-950 dark:ring-white/10"
            >
                <div class="flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm/6">
                    <span class="truncate text-neutral-700 dark:text-neutral-300">
                        <span class="mr-2 text-neutral-400 select-none dark:text-neutral-600"
                            >$</span
                        >
                        {{ installCommand }}
                    </span>
                    <button
                        v-if="isSupported"
                        type="button"
                        class="shrink-0 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-safe:transition dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        :aria-label="
                            copied ? t('home.hero.copiedLabel') : t('home.hero.copyAriaLabel')
                        "
                        @click="copy(installCommand)"
                    >
                        {{ copied ? t('home.hero.copiedLabel') : t('home.hero.copyLabel') }}
                    </button>
                </div>
            </div>
            <p
                class="max-w-xl text-xs/5 text-pretty text-neutral-500 motion-safe:animate-fade-in motion-safe:[animation-delay:450ms] dark:text-neutral-500"
            >
                {{ t('home.hero.frameworkNote') }}
            </p>
            <ul
                class="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs/5 text-neutral-500 motion-safe:animate-fade-in motion-safe:[animation-delay:500ms] dark:text-neutral-500"
            >
                <li v-for="(badge, i) in heroBadges" :key="badge" class="flex items-center gap-2">
                    <span
                        class="rounded-full bg-white/60 px-2.5 py-1 font-mono ring-1 ring-neutral-950/5 backdrop-blur dark:bg-white/5 dark:ring-white/10"
                    >
                        {{ badge }}
                    </span>
                    <span
                        v-if="i < heroBadges.length - 1 || bundleLabel"
                        class="text-neutral-300 dark:text-neutral-700"
                        aria-hidden="true"
                        >·</span
                    >
                </li>
                <li v-if="bundleLabel" class="flex items-center gap-2">
                    <span
                        class="rounded-full bg-white/60 px-2.5 py-1 font-mono ring-1 ring-neutral-950/5 backdrop-blur dark:bg-white/5 dark:ring-white/10"
                    >
                        {{ bundleLabel }}
                    </span>
                </li>
            </ul>
        </SiteContainer>
    </section>
</template>

<style scoped>
@supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
        .hero-editor-wrap {
            animation: editor-parallax linear both;
            animation-timeline: scroll();
            animation-range: 0 600px;
        }
        .hero-headline {
            animation: headline-parallax linear both;
            animation-timeline: scroll();
            animation-range: 0 500px;
        }
    }
}

/* Opacity only — DO NOT add `transform`/`filter`/`perspective`/`will-change`
   here or on `.hero-editor-wrap`. The @templatical/editor instance mounts
   inside this wrapper, and any of those properties makes the wrapper a CSS
   containing block for `position: fixed` — which mislocates the editor's
   floating UI (color pickers, rich-text toolbars) and its drag ghost. This
   is the reason the editor parallax is a fade, not a translate/scale. */
@keyframes editor-parallax {
    to {
        opacity: 0.95;
    }
}

@keyframes headline-parallax {
    to {
        transform: translateY(-12px);
        letter-spacing: -0.012em;
    }
}
</style>
