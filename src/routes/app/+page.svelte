<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Container from '$lib/components/Utils/Container.svelte';
	import WrapTranslation from '$lib/components/Utils/WrapTranslation.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import IconArrowRight from '~icons/mdi/ArrowRight';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME}
	</title>
</svelte:head>

<Container>
	<h1 class="text-3xl mb-4">
		<WrapTranslation let:infix message={$LL.welcome(data.currentUser.name)}>
			<strong>
				{infix}
			</strong>
		</WrapTranslation>
	</h1>
	<a href="/app/docs" class="card bg-base-200 shadow-xl mb-6">
		<div class="card-body p-5">
			<div class="card-title flex justify-between">
				{$LL.docs()}
				<span class="self-start">
					<IconArrowRight />
				</span>
			</div>
			<p>
				{$LL.manageDocs()}
			</p>
		</div>
	</a>

	<a href="/app/settings" class="card bg-base-200 shadow-xl mb-6">
		<div class="card-body p-5">
			<div class="card-title flex justify-between">
				{$LL.settings()}
				<span class="self-start">
					<IconArrowRight />
				</span>
			</div>
			<p>
				{$LL.manageSettings()}
			</p>
		</div>
	</a>
</Container>
