<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface $$Props extends HTMLSelectAttributes {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
		required?: boolean;
		value?: string | number;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let required = false;
	export let value: string | number | undefined = undefined;
	let klass = '';
	export { klass as class };
</script>

<div>
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

	<select
		{name}
		{required}
		bind:value
		class:select-error={errors}
		class="select select-bordered w-full {klass}"
		{...$$restProps}
	>
		<slot />
	</select>

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
