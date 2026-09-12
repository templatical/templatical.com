import { onMounted, ref, watch, type Ref } from 'vue';
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { ShikiTransformer } from 'shiki';
import { useDarkMode } from './useDarkMode';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export function getHighlighter(): Promise<HighlighterCore> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighterCore({
            themes: [import('@shikijs/themes/github-dark'), import('@shikijs/themes/github-light')],
            langs: [
                import('@shikijs/langs/javascript'),
                import('@shikijs/langs/html'),
                import('@shikijs/langs/lit'),
            ],
            engine: createJavaScriptRegexEngine(),
        });
    }
    return highlighterPromise;
}

export function shikiThemeFor(isDark: boolean): 'github-dark' | 'github-light' {
    return isDark ? 'github-dark' : 'github-light';
}

export const stripPreBackground: ShikiTransformer = {
    pre(node) {
        if (typeof node.properties?.style === 'string') {
            node.properties.style = node.properties.style
                .replace(/background-color\s*:\s*[^;]+;?/g, '')
                .trim();
        }
    },
};

export const tagTemplateAsHtml: ShikiTransformer = {
    preprocess(code) {
        return code.replace(/(template\s*:\s*)`/g, '$1html`');
    },
    postprocess(html) {
        // Remove only the synthetic tag `preprocess` injected — it is always
        // immediately followed by the template literal's opening backtick.
        // Matching bare `html` anywhere would also delete a legitimate
        // identifier, e.g. `const { html } = mjml2html(mjml)`.
        return html.replace(/<span[^>]*>\s*html\s*<\/span>(?=<span[^>]*>\s*`)/g, '');
    },
};

export function useShikiHighlight(
    code: string,
    options: { lang?: string; transformers?: ShikiTransformer[] } = {},
): Ref<string | null> {
    const html = ref<string | null>(null);
    const { isDark } = useDarkMode();
    const render = async () => {
        const h = await getHighlighter();
        html.value = h.codeToHtml(code, {
            lang: options.lang ?? 'javascript',
            theme: shikiThemeFor(isDark.value),
            transformers: options.transformers,
        });
    };
    onMounted(render);
    watch(isDark, render);
    return html;
}
