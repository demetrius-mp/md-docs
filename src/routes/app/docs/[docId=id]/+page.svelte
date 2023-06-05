<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';

	export let data;
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>
