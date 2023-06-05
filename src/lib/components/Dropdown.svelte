<script lang="ts" context="module">
	type DropdownController = {
		close: () => void;
		open: () => void;
	};

	export function createDropdownController(): DropdownController {
		return {
			close: () => {
				return;
			},
			open: () => {
				return;
			},
		};
	}
</script>

<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	export let label: string;
	const dropdown = createMenu({ label });
	export const open = dropdown.open;
	export const close = dropdown.close;
</script>

<div class="relative inline-block text-left">
	<slot name="button" buttonAction={dropdown.button} />

	<Transition
		show={$dropdown.expanded}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<div use:dropdown.items class="z-10 absolute right-0 focus:outline-none origin-top-right">
			<slot
				name="menuItems"
				activeItem={$dropdown.active}
				itemAction={dropdown.item}
				{open}
				{close}
			/>
		</div>
	</Transition>
</div>
