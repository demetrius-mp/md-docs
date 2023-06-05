<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import LL from '$lib/i18n/i18n-svelte';
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - {$LL.settings()}
	</title>
</svelte:head>
