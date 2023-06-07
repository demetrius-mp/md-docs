<script lang="ts">
	import 'highlight.js/styles/github-dark.css';
	import renderMathInElement from 'katex/contrib/auto-render';
	import 'katex/dist/katex.min.css';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		content: string;
		class?: string;
	}

	export let content: string;
	let klass = '';
	export { klass as class };

	let htmlElement: HTMLElement;

	$: if (htmlElement && content)
		renderMathInElement(htmlElement, {
			delimiters: [
				{ left: '$$', right: '$$', display: true },
				{ left: '$', right: '$', display: false },
			],
		});
</script>

<article
	bind:this={htmlElement}
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
