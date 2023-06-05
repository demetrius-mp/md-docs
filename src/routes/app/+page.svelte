<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import LL from '$lib/i18n/i18n-svelte';
	import IconArrowRight from '~icons/mdi/ArrowRight';
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME}
	</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 mb-4">
	<div class="mx-auto max-w-6xl">
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
	</div>
</div>
