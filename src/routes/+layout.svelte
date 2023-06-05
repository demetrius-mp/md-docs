<script lang="ts">
	import { enhance } from '$app/forms';
	import { navigating } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import PageLoadingIndicator from '$lib/components/PageLoadingIndicator.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import IconLogoutVariant from '~icons/mdi/LogoutVariant';
	import '../app.postcss';

	export let data;
</script>

<PageLoadingIndicator isLoading={Boolean($navigating)} />

<form id="sign-out" class="invisible" use:enhance action="/sign-out" method="post" />

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">
			{PUBLIC_APP_NAME}
		</a>
	</div>
	<div class="flex-none">
		{#if data.currentUser}
			<Dropdown label="Profile dropdown">
				<button
					slot="button"
					let:buttonAction
					use:buttonAction
					class="btn btn-ghost btn-circle avatar focus:outline-none"
				>
					<div class="w-10 rounded-full">
						<img src={data.currentUser.profilePictureUrl} alt="profile" />
					</div>
				</button>

				<ul
					slot="menuItems"
					let:itemAction
					let:activeItem
					class="menu bg-base-300 w-56 p-2 rounded-box focus:outline-none"
				>
					<li use:itemAction>
						<button
							form="sign-out"
							type="submit"
							class="text-error"
							class:active={activeItem === 'Sign out'}
						>
							<IconLogoutVariant class="text-xl" />
							{$LL.signOut()}
						</button>
					</li>
				</ul>
			</Dropdown>
		{:else}
			<a href="/sign-up" class="btn btn-ghost">
				{$LL.signUp()}
			</a>
			<a href="/sign-in" class="btn btn-ghost">
				{$LL.signIn()}
			</a>
		{/if}
	</div>
</div>

<slot />
