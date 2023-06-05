<script lang="ts">
	import { navigating } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import PageLoadingIndicator from '$lib/components/PageLoadingIndicator.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import '../app.postcss';
</script>

<PageLoadingIndicator isLoading={Boolean($navigating)} />

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">
			{PUBLIC_APP_NAME}
		</a>
	</div>
	<div class="flex-none">
		<a href="/sign-up" class="btn btn-ghost">
			{$LL.signUp()}
		</a>
		<a href="/sign-in" class="btn btn-ghost">
			{$LL.signIn()}
		</a>
	</div>
</div>

<slot />
