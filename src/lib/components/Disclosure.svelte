<script lang="ts" context="module">
	type DisclosureController = {
		close: () => void;
		open: () => void;
	};

	export function createDisclosureController(): DisclosureController {
		return {
			close: () => {
				return;
			},
			open: () => {
				return;
			}
		};
	}
</script>

<script lang="ts">
	import { createDisclosure } from 'svelte-headlessui';

	export let label: string;
	const disclosure = createDisclosure({ label });
	export const open = disclosure.open;
	export const close = disclosure.close;
</script>

<slot
	buttonAction={disclosure.button}
	panelAction={disclosure.panel}
	expanded={$disclosure.expanded}
/>
