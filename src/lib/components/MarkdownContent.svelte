<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		content: string;
		class?: string;
	}

	export let content: string;
	let klass = '';
	export { klass as class };
</script>

<div {...$$restProps} class="prose max-w-full {klass}">
	{@html content}
</div>
