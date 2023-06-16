<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import Container from '$lib/components/Utils/Container.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, constraints, errors, enhance, submitting } = superForm(data.form, {
		onUpdated(event) {
			if (!event.form.valid) {
				if (event.form.errors.confirmPassword) {
					$form.confirmPassword = '';
				}

				if (event.form.errors.email) {
					$form.email = '';
				}
			}
		},
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME} - {$LL.signUp()}</title>
</svelte:head>

<Container>
	<form method="post" action="/sign-up" class="flex flex-col gap-3" use:enhance>
		<Input
			name="name"
			type="text"
			label={$LL.form.name()}
			bind:value={$form.name}
			{...$constraints.name}
			errors={$errors.name}
		/>
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
		<Input
			name="confirmPassword"
			type="password"
			label={$LL.form.confirmPassword()}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
			errors={$errors.confirmPassword}
		/>
		<SubmitButton class="w-full" isSubmitting={$submitting} />
	</form>
</Container>
