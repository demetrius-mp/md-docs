<script lang="ts">
	import IconAlertCircleOutline from '~icons/mdi/AlertCircleOutline';

	export let errors: string[] | undefined = undefined;
</script>

{#if errors}
	{#each errors as error}
		<div class="alert alert-error shadow-lg">
			<div>
				<IconAlertCircleOutline />
				<span>{error}</span>
			</div>
		</div>
	{/each}
{/if}
