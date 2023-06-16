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
				$form.password = '';
			}
		},
	});
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME} - {$LL.signIn()}</title>
</svelte:head>

<Container>
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
</Container>
