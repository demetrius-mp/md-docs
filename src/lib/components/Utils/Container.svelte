<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		class?: string;
		onlyHorizontal?: boolean;
	}

	let klass = '';
	export { klass as class };
	export let onlyHorizontal = false;
</script>

<div
	class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 {klass}"
	{...$$restProps}
	class:my-4={!onlyHorizontal}
>
	<div class="mx-auto max-w-6xl">
		<slot />
	</div>
</div>
