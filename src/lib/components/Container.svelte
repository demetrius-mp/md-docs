<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		class?: string;
	}

	let klass = '';
	export { klass as class };
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 mb-4 {klass}" {...$$restProps}>
	<div class="mx-auto max-w-6xl">
		<slot />
	</div>
</div>
