<script lang="ts" context="module">
	export type DocState = 'base' | 'edited' | 'saving' | 'saved' | 'error';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import IconContentSave from '~icons/mdi/ContentSave';
	import IconContentSaveAlert from '~icons/mdi/ContentSaveAlert';
	import IconContentSaveCheck from '~icons/mdi/ContentSaveCheck';

	export let docState: DocState = 'base';
	export let positionClasses = 'right-5 bottom-5';

	const dispatch = createEventDispatcher<{ save: void }>();
</script>

{#if docState !== 'base'}
	<button
		transition:scale={{ duration: 150 }}
		on:click={() => dispatch('save')}
		title="Save changes"
		disabled={docState == 'saving'}
		class="fixed z-90 {positionClasses} btn btn-primary btn-circle drop-shadow-lg text-2xl hover:drop-shadow-2xl"
		class:btn-error={docState == 'error'}
		class:btn-outline={docState == 'error'}
	>
		{#if docState === 'edited'}
			<IconContentSave class="text-xl" />
		{:else if docState == 'saving'}
			<span class="loading loading-spinner" />
		{:else if docState == 'saved'}
			<IconContentSaveCheck class="text-xl" />
		{:else if docState == 'error'}
			<IconContentSaveAlert class="text-xl" />
		{/if}
	</button>
{/if}
