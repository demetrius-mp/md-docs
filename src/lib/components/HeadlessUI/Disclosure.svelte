<script lang="ts">
	import { browser } from '$app/environment';
	import { createDisclosure } from 'svelte-headlessui';

	export let label: string;
	const disclosure = createDisclosure({ label });

	export let open = false;

	$: {
		if (browser) {
			open ? disclosure.open() : disclosure.close();
		}
	}

	$: open = $disclosure.expanded;
</script>

<slot
	buttonAction={disclosure.button}
	panelAction={disclosure.panel}
	expanded={$disclosure.expanded}
/>
