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

	const renderMathInElementAction: Action<HTMLElement> = (node) => {
		renderMathInElement(node, {
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
	};
</script>

<div use:renderMathInElementAction {...$$restProps} class="prose max-w-full {klass}">
	{@html content}
</div>

<style global lang="postcss">
	div.prose > pre:has(code.hljs) {
		@apply p-0;
	}
</style>
