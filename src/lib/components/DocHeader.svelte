<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Dialog, { createDialogController } from '$lib/components/Dialog.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import WrapTranslation from '$lib/components/WrapTranslation.svelte';
	import LL from '$lib/i18n/i18n-svelte.js';
	import type { Doc } from '@prisma/client';
	import IconBookOpen from '~icons/mdi/BookOpen';
	import IconClipboardCheckOutline from '~icons/mdi/ClipboardCheckOutline';
	import IconClipboardOutline from '~icons/mdi/ClipboardOutline';
	import IconClose from '~icons/mdi/Close';
	import IconDotsVertical from '~icons/mdi/DotsVertical';
	import IconEye from '~icons/mdi/Eye';
	import IconFileDocument from '~icons/mdi/FileDocument';
	import IconPencil from '~icons/mdi/Pencil';
	import IconShareVariant from '~icons/mdi/ShareVariant';
	import IconTrash from '~icons/mdi/Trash';

	type DocData = {
		title: string;
		description: string;
		content: string;
	};

	export let docId: Doc['id'];
	export let docUuid: Doc['uuid'];
	export let docData: DocData;
	export let docLayout: 'edit' | 'render' | 'hybrid' = 'edit';
	export let mode: 'show' | 'edit' = 'show';

	const dialogController = createDialogController();

	$: shareDocUrl = $page.url.origin + '/shared/' + docUuid;

	let copiedToClipboard = false;
	function copyToClipboard() {
		copiedToClipboard = true;

		setTimeout(() => {
			copiedToClipboard = false;
		}, 5000);

		navigator.clipboard.writeText(shareDocUrl);
	}
</script>

{#if mode === 'edit'}
	<form
		class="invisible"
		id="delete-doc"
		action="/app/docs/{docId}/delete"
		method="post"
		use:enhance
	/>
{/if}

<div class="flex flex-col gap-1">
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-1 min-w-0 flex-1">
			<IconFileDocument class="text-3xl" />

			<input
				type="text"
				disabled={mode === 'show'}
				class:hover:!outline-none={mode === 'show'}
				style="font-size: 32px"
				class="invisible-input"
				bind:value={docData.title}
			/>
		</div>
		{#if mode === 'edit'}
			<Dropdown label="Layout options dropdown">
				<button class="btn btn-ghost btn-square" slot="button" let:buttonAction use:buttonAction>
					<IconDotsVertical class="text-2xl" />
				</button>

				<ul
					slot="menuItems"
					let:itemAction
					class="gap-1 z-50 menu menu-sm bg-base-300 w-56 p-2 rounded-box"
				>
					<li class="menu-title">{$LL.docLayout.layout()}</li>

					<li>
						<button
							class:active={docLayout == 'edit'}
							use:itemAction
							on:click={() => (docLayout = 'edit')}
							class="flex gap-2"
						>
							<IconPencil class="text-xl" />
							{$LL.docLayout.edit()}
						</button>
					</li>

					<li>
						<button
							class:active={docLayout == 'hybrid'}
							use:itemAction
							on:click={() => (docLayout = 'hybrid')}
							class="flex gap-2"
						>
							<IconBookOpen class="text-xl" />
							{$LL.docLayout.hybrid()}
						</button>
					</li>

					<li>
						<button
							class:active={docLayout == 'render'}
							use:itemAction
							on:click={() => (docLayout = 'render')}
							class="flex gap-2"
						>
							<IconEye class="text-xl" />
							{$LL.docLayout.render()}
						</button>
					</li>

					<div class="divider -mb-2 -mt-1 px-1" />

					<li class="menu-title">
						{$LL.docActions.actions()}
					</li>

					<li>
						<button on:click={dialogController.open} use:itemAction class="flex gap-2">
							<IconShareVariant class="text-xl" />
							{$LL.docActions.share()}
						</button>
					</li>

					<li class="text-error hover:text-error">
						<button use:itemAction form="delete-doc" class="flex gap-2" type="submit">
							<IconTrash class="text-xl" />
							{$LL.docActions.delete()}
						</button>
					</li>
				</ul>
			</Dropdown>
		{/if}
	</div>

	<input
		disabled={mode === 'show'}
		class:hover:!outline-none={mode === 'show'}
		type="text"
		style="font-size: 20px"
		class="invisible-input w-full"
		bind:value={docData.description}
	/>
</div>

{#if mode === 'edit'}
	<Dialog
		bind:close={dialogController.close}
		bind:open={dialogController.open}
		label={$LL.docShare.shareDocument()}
	>
		<div class="flex justify-between items-center">
			<h1 class="text-2xl">
				{$LL.docShare.shareDocument()}
			</h1>

			<button type="button" class="btn btn-ghost btn-sm" on:click={dialogController.close}>
				<IconClose class="text-xl" />
			</button>
		</div>

		<div class="divider my-1" />

		<div class="flex flex-col gap-2">
			<p>
				<WrapTranslation message={$LL.docShare.onlyViewLink()} let:infix>
					<strong>
						{infix}
					</strong>
				</WrapTranslation>
			</p>

			<div class="join">
				<input
					disabled
					class="input !border-gray-600 !bg-base-100 join-item flex-1"
					value={shareDocUrl}
				/>
				<button on:click={copyToClipboard} class="btn join-item btn-accent btn-outline">
					{#if copiedToClipboard}
						<IconClipboardCheckOutline />
					{:else}
						<IconClipboardOutline />
					{/if}
				</button>
			</div>
		</div>
	</Dialog>
{/if}
