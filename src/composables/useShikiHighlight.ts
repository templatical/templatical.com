import { onMounted, ref, type Ref } from 'vue';
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { ShikiTransformer } from 'shiki';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export function getHighlighter(): Promise<HighlighterCore> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighterCore({
            themes: [import('@shikijs/themes/github-dark')],
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
        return html.replace(/<span[^>]*>\s*html\s*<\/span>/g, '');
    },
};

export function useShikiHighlight(
    code: string,
    options: { lang?: string; transformers?: ShikiTransformer[] } = {},
): Ref<string | null> {
    const html = ref<string | null>(null);
    onMounted(async () => {
        const h = await getHighlighter();
        html.value = h.codeToHtml(code, {
            lang: options.lang ?? 'javascript',
            theme: 'github-dark',
            transformers: options.transformers,
        });
    });
    return html;
}
