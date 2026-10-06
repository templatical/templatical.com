import { canonicalUrl } from '@/lib/seo';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

/**
 * One page's head: its title and description mirrored into the Open Graph and
 * Twitter tags, plus the canonical URL and the og:url that repeats it. A noindex
 * page declares neither: a canonical would tell crawlers to index the URL that
 * robots asks them to drop, and auditPages fails the build on that combination.
 */
export function usePageMeta(
    titleKey: string,
    descriptionKey: string,
    options: { noindex?: boolean } = {},
): void {
    const { t } = useI18n();
    const route = useRoute();
    const title = computed(() => t(titleKey));
    const description = computed(() => t(descriptionKey));
    const canonical = computed(() => canonicalUrl(route.path));
    useHead({
        title,
        link: options.noindex ? [] : [{ rel: 'canonical', href: canonical }],
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            ...(options.noindex
                ? [{ name: 'robots', content: 'noindex' }]
                : [{ property: 'og:url', content: canonical }]),
        ],
    });
}
