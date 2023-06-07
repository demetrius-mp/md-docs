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

	function renderMathInElementWrapper(element: HTMLElement) {
		renderMathInElement(element, {
			delimiters: [
				{
					left: '$$',
					right: '$$',
					display: true,
				},
				{
					left: '$',
					right: '$',
					display: false,
				},
			],
			throwOnError: false,
		});
	}

	const renderMathInElementAction: Action<HTMLElement, string> = (node, _) => {
		renderMathInElementWrapper(node);

		return {
			update(_) {
				renderMathInElementWrapper(node);
			},
		};
	};
</script>

<article use:renderMathInElementAction={content} {...$$restProps} class="prose max-w-full {klass}">
	{@html content}
</article>

<style global lang="postcss">
	article.prose > pre:has(code.hljs) {
		@apply p-0;
	}
</style>
