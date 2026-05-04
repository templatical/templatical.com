<script setup lang="ts">
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import RevealOnScroll from '@/components/RevealOnScroll.vue';
import SiteButton from '@/components/SiteButton.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteSection from '@/components/SiteSection.vue';
import SiteText from '@/components/SiteText.vue';
import { ArrowRight, Check, ChevronRight } from 'lucide-vue-next';
import { useHead } from '@unhead/vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { tagTemplateAsHtml } from '@/composables/useShikiHighlight';
import CodeBlock from '@/components/CodeBlock.vue';
import VariantTabs from '@/components/VariantTabs.vue';
import { URLS } from '@/lib/urls';

const { t, tm, locale, fallbackLocale } = useI18n();

function docsUrl(path: string): string {
    const fallback = String(fallbackLocale.value);
    const prefix = locale.value === fallback ? '' : `/${locale.value}`;
    return `${URLS.docs}${prefix}${path}`;
}

useHead({
    title: computed(() => t('features.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('features.meta.description')),
        },
    ],
});

interface CodeVariant {
    label: string;
    code: string;
}
interface FeatureSection {
    slug: string;
    eyebrow: string;
    title: string;
    description: string;
    outcome: string;
    features: string[];
    code?: string;
    variants?: CodeVariant[];
    docsPath: string;
    docsLabel: string;
}

const featureSections = computed<FeatureSection[]>(() => [
    {
        slug: 'custom-blocks',
        docsPath: '/guide/custom-blocks',
        docsLabel: t('features.customBlocks.docsLabel'),
        eyebrow: t('features.customBlocks.eyebrow'),
        title: t('features.customBlocks.title'),
        description: t('features.customBlocks.description'),
        outcome: t('features.customBlocks.outcome'),
        features: tm('features.customBlocks.features') as string[],
        variants: [
            {
                label: t('features.variants.static'),
                code: `const editor = await init({
  container: '#editor',
  customBlocks: [
    {
      type: 'event-details',
      name: 'Event Details',
      description: 'Date, time, location, and a map link',
      fields: [
        { type: 'text',  key: 'eventName', label: 'Event Name', required: true },
        { type: 'text',  key: 'date',      label: 'Date',       default: 'April 15, 2026' },
        { type: 'text',  key: 'location',  label: 'Location' },
        { type: 'text',  key: 'mapUrl',    label: 'Map Link (optional)' },
        { type: 'color', key: 'accent',    label: 'Accent',     default: '#7c3aed' },
      ],
      template: \`
        <div style="border: 2px solid {{ accent }}; padding: 20px; border-radius: 8px;">
          <h3 style="color: {{ accent }};">{{ eventName }}</h3>
          <p>📅 {{ date }} · 📍 {{ location }}</p>
          {% if mapUrl %}
            <a href="{{ mapUrl }}">View on Map →</a>
          {% endif %}
        </div>
      \`,
    },
  ],
})`,
            },
            {
                label: t('features.variants.apiBacked'),
                code: `const editor = await init({
  container: '#editor',
  customBlocks: [
    {
      type: 'featured-article',
      name: 'Featured Article',
      description: 'Fetches article data from your CMS',
      fields: [
        { type: 'text',     key: 'title',    label: 'Title',    readOnly: true },
        { type: 'textarea', key: 'excerpt',  label: 'Excerpt',  readOnly: true },
        { type: 'image',    key: 'imageUrl', label: 'Cover image' },
        { type: 'text',     key: 'author',   label: 'Author',   readOnly: true },
      ],
      template: \`
        <article style="border: 1px solid #e5e7eb; border-radius: 8px;">
          {% if imageUrl %}
            <img src="{{ imageUrl }}" width="100%" />
          {% endif %}
          <div style="padding: 20px;">
            <h3>{{ title }}</h3>
            <p>{{ excerpt }}</p>
            {% if author %}
              <small>By {{ author }}</small>
            {% endif %}
          </div>
        </article>
      \`,
      dataSource: {
        label: 'Change article',
        async onFetch({ fieldValues }) {
          const res = await fetch(\`/api/articles?category=\${fieldValues.category}\`)
          const articles = await res.json()
          const picked = await openPicker(articles)
          return picked?.data ?? null
        },
      },
    },
  ],
})`,
            },
        ],
    },
    {
        slug: 'merge-tags',
        docsPath: '/guide/merge-tags',
        docsLabel: t('features.mergeTags.docsLabel'),
        eyebrow: t('features.mergeTags.eyebrow'),
        title: t('features.mergeTags.title'),
        description: t('features.mergeTags.description'),
        outcome: t('features.mergeTags.outcome'),
        features: tm('features.mergeTags.features') as string[],
        variants: [
            {
                label: t('features.variants.predefined'),
                code: `const editor = await init({
  container: '#editor',
  mergeTags: {
    syntax: 'liquid',
    tags: [
      { label: 'First name',      value: '{{first_name}}' },
      { label: 'Email',           value: '{{email}}' },
      { label: 'Plan name',       value: '{{plan_name}}' },
      { label: 'Order ID',        value: '{{order_id}}' },
      { label: 'Order total',     value: '{{order_total}}' },
      { label: 'Unsubscribe URL', value: '{{unsubscribe_url}}' },
    ],
  },
})`,
            },
            {
                label: t('features.variants.customPicker'),
                code: `const editor = await init({
  container: '#editor',
  mergeTags: {
    syntax: 'liquid',
    tags: [
      { label: 'First name', value: '{{first_name}}' },
      { label: 'Email',      value: '{{email}}' },
    ],
    // Editor calls onRequest when the user inserts a merge tag.
    // Open your own picker (CRM-aware modal, search, etc.) and
    // resolve with the chosen tag — or null on cancel.
    async onRequest() {
      const picked = await openMergeTagPicker({
        title: 'Select a merge tag',
        groups: ['Contact', 'Account', 'Order'],
        endpoint: '/api/crm/fields',
      })
      return picked ?? null
    },
  },
})`,
            },
        ],
    },
    {
        slug: 'display-conditions',
        docsPath: '/guide/display-conditions',
        docsLabel: t('features.displayConditions.docsLabel'),
        eyebrow: t('features.displayConditions.eyebrow'),
        title: t('features.displayConditions.title'),
        description: t('features.displayConditions.description'),
        outcome: t('features.displayConditions.outcome'),
        features: tm('features.displayConditions.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  displayConditions: {
    conditions: [
      {
        label: 'VIP Partners',
        before: '{% if vip_partner %}',
        after: '{% endif %}',
        group: 'Audience',
        description: 'Show only to VIP partner accounts',
      },
      {
        label: 'Enterprise',
        before: '{% if plan == "enterprise" %}',
        after: '{% endif %}',
        group: 'Audience',
      },
      {
        label: 'Early Bird',
        before: '{% if early_bird %}',
        after: '{% endif %}',
        group: 'Registration',
      },
    ],
    allowCustom: true,
  },
})`,
    },
    {
        slug: 'theming',
        docsPath: '/guide/theming',
        docsLabel: t('features.theming.docsLabel'),
        eyebrow: t('features.theming.eyebrow'),
        title: t('features.theming.title'),
        description: t('features.theming.description'),
        outcome: t('features.theming.outcome'),
        features: tm('features.theming.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  uiTheme: 'auto',
  theme: {
    '--tpl-color-primary':    '#0d9488',
    '--tpl-color-accent':     '#0ea5e9',
    '--tpl-color-background': '#ffffff',
    '--tpl-radius':           '10px',
    '--tpl-font-sans':        'Inter, system-ui, sans-serif',
    dark: {
      '--tpl-color-primary':    '#22d3ee',
      '--tpl-color-accent':     '#a78bfa',
      '--tpl-color-background': '#0b1220',
    },
  },
})`,
    },
    {
        slug: 'media-library',
        docsPath: '/guide/media-library',
        docsLabel: t('features.mediaLibrary.docsLabel'),
        eyebrow: t('features.mediaLibrary.eyebrow'),
        title: t('features.mediaLibrary.title'),
        description: t('features.mediaLibrary.description'),
        outcome: t('features.mediaLibrary.outcome'),
        features: tm('features.mediaLibrary.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  // Editor calls onRequestMedia when the user picks an image —
  // open your own asset browser (S3, Cloudinary, your CMS, etc.)
  // and resolve with { url, alt } — or null on cancel.
  async onRequestMedia({ accept } = {}) {
    const picked = await openAssetBrowser({
      accept,                 // e.g. ['images']
      endpoint: '/api/assets',
    })
    if (!picked) return null
    return { url: picked.url, alt: picked.alt }
  },
})`,
    },
    {
        slug: 'defaults',
        docsPath: '/guide/defaults',
        docsLabel: t('features.defaults.docsLabel'),
        eyebrow: t('features.defaults.eyebrow'),
        title: t('features.defaults.title'),
        description: t('features.defaults.description'),
        outcome: t('features.defaults.outcome'),
        features: tm('features.defaults.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  blockDefaults: {
    button: {
      backgroundColor: '#0f3460',
      textColor: '#ffffff',
      borderRadius: 2,
      fontSize: 14,
      buttonPadding: { top: 14, right: 28, bottom: 14, left: 28 },
    },
    divider: { color: '#e5e7eb', thickness: 1 },
    spacer: { height: 24 },
    image:  { align: 'center' },
  },
  templateDefaults: {
    width: 640,
    backgroundColor: '#f8f9fa',
    fontFamily: 'Georgia, serif',
  },
})`,
    },
]);

const activeVariant = ref<Record<string, number>>({});
const variantDirection = ref<Record<string, 1 | -1>>({});

function variantIndex(slug: string): number {
    return activeVariant.value[slug] ?? 0;
}
function selectVariant(slug: string, idx: number) {
    const prev = variantIndex(slug);
    if (idx === prev) return;
    variantDirection.value[slug] = idx > prev ? 1 : -1;
    activeVariant.value[slug] = idx;
}
function variantAnimClass(slug: string): string {
    return (variantDirection.value[slug] ?? 1) === 1
        ? 'motion-safe:animate-tab-in-right'
        : 'motion-safe:animate-tab-in-left';
}

const supportingItemKeys = [
    'framework',
    'output',
    'darkMode',
    'i18n',
    'undoRedo',
    'responsivePreview',
] as const;

</script>

<template>
    <div>
        <section
            class="relative -mt-21 bg-white pt-37 pb-28 sm:pt-41 sm:pb-40 dark:bg-neutral-950"
        >
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>
                            {{ t('features.hero.eyebrow') }}
                        </SiteEyebrow>
                        <HeroHeadline
                            :text="t('features.hero.headline')"
                            as="h1"
                        />
                    </div>
                    <SiteText class="text-pretty">
                        <p>{{ t('features.hero.subheadline') }}</p>
                    </SiteText>
                    <div
                        class="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-3 py-1 text-xs/5 font-medium text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300"
                    >
                        <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                        {{ t('features.hero.pricingPill') }}
                    </div>
                </div>
            </SiteContainer>
        </section>

        <section
            v-for="(section, idx) in featureSections"
            :key="section.slug"
            :class="[
                'py-20 lg:py-28',
                idx % 2 === 0
                    ? 'bg-white dark:bg-neutral-950'
                    : 'bg-neutral-50 dark:bg-neutral-900',
            ]"
        >
            <div
                class="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10"
            >
                <RevealOnScroll>
                    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                        <div class="flex flex-col gap-5">
                            <div class="text-sm/7 font-semibold text-primary">
                                {{ section.eyebrow }}
                            </div>
                            <h2
                                class="font-display text-3xl/10 tracking-tight text-pretty text-neutral-950 sm:text-4xl/12 dark:text-white"
                            >
                                {{ section.title }}
                            </h2>
                            <p class="text-base/7 text-neutral-700 dark:text-neutral-400">
                                {{ section.description }}
                            </p>
                            <p class="text-base/7 font-medium text-neutral-950 dark:text-white">
                                {{ section.outcome }}
                            </p>
                            <ul class="mt-2 flex flex-col gap-3">
                                <li
                                    v-for="feature in section.features"
                                    :key="feature"
                                    class="flex gap-3 text-sm/7 text-neutral-700 dark:text-neutral-400"
                                >
                                    <Check
                                        class="mt-0.5 size-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    {{ feature }}
                                </li>
                            </ul>
                            <a
                                :href="docsUrl(section.docsPath)"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-2 inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                            >
                                {{ section.docsLabel }}
                                <ArrowRight class="size-4" aria-hidden="true" />
                            </a>
                        </div>
                        <div class="flex flex-col gap-4">
                            <VariantTabs
                                v-if="section.variants?.length"
                                :options="section.variants"
                                :model-value="variantIndex(section.slug)"
                                :aria-label="t('features.examplesLabel', { title: section.title })"
                                @update:model-value="selectVariant(section.slug, $event)"
                            />
                            <div
                                v-if="section.variants?.length"
                                :key="`${section.slug}-${variantIndex(section.slug)}`"
                                :class="variantAnimClass(section.slug)"
                            >
                                <CodeBlock
                                    :code="section.variants[variantIndex(section.slug)].code"
                                    lang="lit"
                                    :transformers="[tagTemplateAsHtml]"
                                />
                            </div>
                            <CodeBlock
                                v-else-if="section.code"
                                :code="section.code"
                                lang="javascript"
                            />
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>

        <SiteSection
            :eyebrow="t('features.supporting.eyebrow')"
            :headline="t('features.supporting.headline')"
            :subheadline="t('features.supporting.subheadline')"
            bg="gray"
            class="!py-14 sm:!py-20"
        >
            <dl
                class="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12"
            >
                <div
                    v-for="(key, idx) in supportingItemKeys"
                    :key="key"
                    class="flex gap-5"
                >
                    <span
                        aria-hidden="true"
                        class="pt-0.5 font-mono text-xs/6 tabular-nums text-neutral-400 dark:text-neutral-600"
                    >
                        {{ String(idx + 1).padStart(2, '0') }}
                    </span>
                    <div class="flex flex-col gap-1.5">
                        <dt
                            class="text-base/7 font-medium text-neutral-950 dark:text-white"
                        >
                            {{ t(`features.supportingItems.${key}.title`) }}
                        </dt>
                        <dd
                            class="max-w-prose text-sm/7 text-pretty text-neutral-700 dark:text-neutral-400"
                        >
                            {{ t(`features.supportingItems.${key}.description`) }}
                        </dd>
                    </div>
                </div>
            </dl>
        </SiteSection>

        <SiteSection
            :eyebrow="t('features.migration.eyebrow')"
            :headline="t('features.migration.title')"
            :subheadline="t('features.migration.description')"
            class="!py-16 sm:!py-24"
        >
            <ul class="flex max-w-2xl flex-col gap-3">
                <li
                    v-for="feature in (tm('features.migration.features') as string[])"
                    :key="feature"
                    class="flex gap-3 text-sm/7 text-neutral-700 dark:text-neutral-400"
                >
                    <Check
                        class="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                    />
                    {{ feature }}
                </li>
            </ul>
            <div class="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a
                    v-for="source in [
                        {
                            labelKey: 'features.migration.guideCtaBeefree',
                            href: docsUrl('/guide/migration-from-beefree'),
                        },
                        {
                            labelKey: 'features.migration.guideCtaUnlayer',
                            href: docsUrl('/guide/migration-from-unlayer'),
                        },
                        {
                            labelKey: 'features.migration.guideCtaHtml',
                            href: docsUrl('/guide/migration-from-html'),
                        },
                    ]"
                    :key="source.href"
                    :href="source.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                    {{ t(source.labelKey) }}
                    <ArrowRight class="size-4" aria-hidden="true" />
                </a>
            </div>
        </SiteSection>

        <section class="bg-white py-20 sm:py-28 dark:bg-neutral-950">
            <SiteContainer>
                <div class="mb-12 flex max-w-2xl flex-col gap-3">
                    <SiteEyebrow>{{ t('features.cta.eyebrow') }}</SiteEyebrow>
                    <h2
                        class="font-display text-3xl/10 tracking-tight text-pretty text-neutral-950 sm:text-4xl/12 dark:text-white"
                    >
                        {{ t('features.cta.headline') }}
                    </h2>
                </div>
                <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                    <div
                        v-for="path in [
                            {
                                key: 'install',
                                links: [{ ctaKey: 'cta', href: URLS.docs }],
                            },
                            {
                                key: 'migrate',
                                links: [
                                    {
                                        ctaKey: 'ctaBeefree',
                                        href: docsUrl('/guide/migration-from-beefree'),
                                    },
                                    {
                                        ctaKey: 'ctaUnlayer',
                                        href: docsUrl('/guide/migration-from-unlayer'),
                                    },
                                    {
                                        ctaKey: 'ctaHtml',
                                        href: docsUrl('/guide/migration-from-html'),
                                    },
                                ],
                            },
                        ]"
                        :key="path.key"
                        class="group relative flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 transition-colors hover:border-neutral-300 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700"
                    >
                        <h3
                            class="font-display text-2xl/8 tracking-tight text-neutral-950 sm:text-3xl/10 dark:text-white"
                        >
                            {{ t(`features.cta.${path.key}.title`) }}
                        </h3>
                        <p class="text-base/7 text-neutral-700 dark:text-neutral-400">
                            {{ t(`features.cta.${path.key}.description`) }}
                        </p>
                        <div class="mt-auto flex flex-wrap gap-x-6 gap-y-2">
                            <a
                                v-for="link in path.links"
                                :key="link.href"
                                :href="link.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                            >
                                {{ t(`features.cta.${path.key}.${link.ctaKey}`) }}
                                <ChevronRight class="size-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </SiteContainer>
        </section>
    </div>
</template>
