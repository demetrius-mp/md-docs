<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, constraints, errors, enhance, submitting } = superForm(data.form, {
		onUpdated(event) {
			if (!event.form.valid) {
				$form.password = '';
			}
		},
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME} - {$LL.signIn()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 mb-4">
	<div class="mx-auto max-w-6xl">
		<form method="post" action="/sign-in" class="flex flex-col gap-3" use:enhance>
			<Input
				name="email"
				type="email"
				label={$LL.form.email()}
				bind:value={$form.email}
				{...$constraints.email}
				errors={$errors.email}
			/>
			<Input
				name="password"
				type="password"
				label={$LL.form.password()}
				bind:value={$form.password}
				{...$constraints.password}
				errors={$errors.password}
			/>
			<SubmitButton class="w-full" isSubmitting={$submitting} />
		</form>
	</div>
</div>
