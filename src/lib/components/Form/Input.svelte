<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
		divClass?: string;
		required?: boolean;
		value?: string | number | null;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let divClass: string | undefined = '';
	export let required = false;
	export let value: string | number | null = '';
	let klass = '';
	export { klass as class };
</script>

<div class={divClass}>
	{#if label || $$slots.label}
		<label for={name} class="label">
			<span class="label-text">
				<slot name="label">
					{label}
				</slot>
				{#if required}
					<span class="text-error"> * </span>
				{/if}
			</span>
		</label>
	{/if}

	<input
		id={name}
		{name}
		{required}
		bind:value
		class:input-error={errors}
		class="input input-bordered w-full {klass}"
		{...$$restProps}
	/>

	{#if errors !== undefined && errors.length > 0}
		<label for={name} class="label">
			<span class="label-text-alt text-error flex flex-col">
				{#each errors as error}
					<span>
						{error}
					</span>
				{/each}
			</span>
		</label>
	{/if}
</div>
