<script lang="ts">
	import 'highlight.js/styles/github-dark.css';
	import 'katex/dist/katex.min.css';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		content: string;
		class?: string;
	}

	export let content: string;
	let klass = '';
	export { klass as class };
</script>

<article {...$$restProps} class="prose lg:prose-lg xl:prose-xl max-w-full {klass}">
	{@html content}
</article>

<style global lang="postcss">
	article.prose > pre:has(code.hljs) {
		@apply p-0;
	}

	span.katex-mathml {
		@apply hidden;
	}
</style>
