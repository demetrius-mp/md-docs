<script lang="ts">
	import { browser } from '$app/environment';
	import { createDialog } from 'svelte-headlessui';
	import { Transition } from 'svelte-transition';

	export let zIndex = 10;
	export let label: string;
	const dialog = createDialog({ label });

	export let open = false;

	$: {
		if (browser) {
			open ? dialog.open() : dialog.close();
		}
	}

	$: open = $dialog.expanded;
</script>

<div style:z-index={zIndex} class="relative">
	<Transition show={$dialog.expanded}>
		<Transition
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} />
		</Transition>
		<div class="fixed inset-0 overflow-y-auto">
			<div class="flex min-h-full items-center justify-center p-4 text-center">
				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div
						class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-5 text-left align-middle shadow-xl transition-all"
						use:dialog.modal
					>
						<slot />
					</div>
				</Transition>
			</div>
		</div>
	</Transition>
</div>
