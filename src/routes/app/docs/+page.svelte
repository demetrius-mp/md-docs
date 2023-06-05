<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import LL from '$lib/i18n/i18n-svelte';
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - {$LL.docs()}
	</title>
</svelte:head>

<div class="flex items-center justify-center h-full flex-col gap-4">
	<h2 class="text-2xl font-semibold">
		{$LL.emptyDocs()}
	</h2>
	<button class="btn btn-primary">
		{$LL.clickHereToCreateADoc()}
	</button>
</div>
