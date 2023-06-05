<script lang="ts">
	import { navigating } from '$app/stores';
	import PageLoadingIndicator from '$lib/components/PageLoadingIndicator.svelte';
	import '../app.postcss';
</script>

<PageLoadingIndicator isLoading={Boolean($navigating)} />

<slot />
