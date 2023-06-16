<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Container from '$lib/components/Container.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import IconArrowRight from '~icons/mdi/ArrowRight';
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME}
	</title>
</svelte:head>

<Container>
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
