<script lang="ts">
	import 'highlight.js/styles/github-dark.css';
	import renderMathInElement from 'katex/contrib/auto-render';
	import 'katex/dist/katex.min.css';
	import type { Action } from 'svelte/action';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		content: string;
		class?: string;
	}

	export let content: string;
	let klass = '';
	export { klass as class };

	const renderMathInElementAction: Action<HTMLElement, string> = (node, _) => {
		renderMathInElement(node, {
			delimiters: [
				{ left: '$$', right: '$$', display: true },
				{ left: '$', right: '$', display: false },
			],
		});

		return {
			update(_) {
				renderMathInElement(node, {
					delimiters: [
						{ left: '$$', right: '$$', display: true },
						{ left: '$', right: '$', display: false },
					],
				});
			},
		};
	};
</script>

<article
	use:renderMathInElementAction={content}
	{...$$restProps}
	class="prose lg:prose-lg xl:prose-xl max-w-full {klass}"
>
	{@html content}
</article>

<style global lang="postcss">
	article.prose > pre:has(code.hljs) {
		@apply p-0;
	}

	span.katex-mathml {
		@apply hidden;
	}

	.katex {
		@apply text-center !important;
	}
</style>
