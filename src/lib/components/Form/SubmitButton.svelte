<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';

	export let isSubmitting = false;

	let klass = 'btn-primary';
	export { klass as class };
</script>

<button disabled={isSubmitting} class="btn btn-primary {klass}">
	{#if isSubmitting}
		<span class="loading loading-spinner" />
	{:else}
		<slot name="icon" />
	{/if}
	<slot>
		{$LL.form.submit()}
	</slot>
</button>
