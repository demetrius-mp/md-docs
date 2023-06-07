import createDOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import markedKatex from 'marked-katex-extension';

import { browser } from '$app/environment';

marked.use(gfmHeadingId());
marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
	}),
);
marked.use(
	markedKatex({
		throwOnError: false,
	}),
);

const DOMPurify = createDOMPurify();

export function parseMarkdown(src: string): string {
	if (!browser) return '';

	const parsed = marked.parse(src, {
		mangle: false,
	});

	return DOMPurify.sanitize(parsed);
}
