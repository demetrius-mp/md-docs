<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { writable } from 'svelte/store';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Dialog, { createDialogController } from '$lib/components/Dialog.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import type { Instance } from 'ink-mde';
	import InkMde from 'ink-mde/svelte';
	import { debounce } from 'lodash';
	import { scale } from 'svelte/transition';
	import IconBookOpen from '~icons/mdi/BookOpen';
	import IconClipboardCheckOutline from '~icons/mdi/ClipboardCheckOutline';
	import IconClipboardOutline from '~icons/mdi/ClipboardOutline';
	import IconClose from '~icons/mdi/Close';
	import IconContentSave from '~icons/mdi/ContentSave';
	import IconContentSaveAlert from '~icons/mdi/ContentSaveAlert';
	import IconContentSaveCheck from '~icons/mdi/ContentSaveCheck';
	import IconDotsVertical from '~icons/mdi/DotsVertical';
	import IconEye from '~icons/mdi/Eye';
	import IconFileDocument from '~icons/mdi/FileDocument';
	import IconPencil from '~icons/mdi/Pencil';
	import IconShareVariant from '~icons/mdi/ShareVariant';
	import IconTrash from '~icons/mdi/Trash';

	export let data;
	let form = {
		title: data.doc.title,
		description: data.doc.description,
		content: data.doc.content,
	};

	let editor: Instance;

	const docLayoutStore = writable<'edit' | 'render' | 'hybrid'>('edit');
	let docState: 'base' | 'edited' | 'saving' | 'saved' | 'error' = 'base';

	function resetForm(data: typeof form) {
		form = {
			title: data.title,
			description: data.description,
			content: data.content,
		};

		if (editor) editor.update(data.content);
	}

	$: resetForm(data.doc);

	const checkDocIsEdited = debounce((doc: typeof form) => {
		if (
			doc.title != data.doc.title ||
			doc.description != data.doc.description ||
			doc.content != data.doc.content
		)
			docState = 'edited';
	}, 1000);

	$: checkDocIsEdited(form);

	async function save() {
		docState = 'saving';

		const res = await fetch(`/app/docs/${data.doc.id}/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		});

		if (res.ok) {
			data.doc.title = form.title;
			data.doc.description = form.description;
			data.doc.content = form.content;

			docState = 'saved';
			setTimeout(() => {
				docState = 'base';
			}, 2000);
		} else {
			docState = 'error';
		}
	}

	const dialogController = createDialogController();

	$: {
		if (dialogController.open) {
			dialogController.open();
		}
	}

	$: shareDocUrl = $page.url.origin + '/shared/' + data.doc.uuid;

	let copiedToClipboard = false;
	function copyToClipboard() {
		copiedToClipboard = true;

		setTimeout(() => {
			copiedToClipboard = false;
		}, 2000);

		navigator.clipboard.writeText(shareDocUrl);
	}
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>

<form
	class="invisible"
	id="delete-doc"
	action="/app/docs/{data.doc.id}/delete"
	method="post"
	use:enhance
/>

<div class="p-2 flex flex-col gap-1">
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-1 min-w-0 flex-1">
			<IconFileDocument class="text-3xl" />

			<input type="text" style="font-size: 32px" class="invisible-input" bind:value={form.title} />
		</div>
		<Dropdown label="Layout options dropdown">
			<button class="btn btn-ghost btn-square" slot="button" let:buttonAction use:buttonAction>
				<IconDotsVertical class="text-2xl" />
			</button>

			<ul
				slot="menuItems"
				let:itemAction
				class="gap-1 z-50 menu menu-sm bg-base-300 w-56 p-2 rounded-box"
			>
				<li class="menu-title">Layout</li>

				<li>
					<button
						class:active={$docLayoutStore == 'edit'}
						use:itemAction
						on:click={() => ($docLayoutStore = 'edit')}
						class="flex gap-2"
					>
						<IconPencil class="text-xl" />
						Edit
					</button>
				</li>

				<li>
					<button
						class:active={$docLayoutStore == 'hybrid'}
						use:itemAction
						on:click={() => ($docLayoutStore = 'hybrid')}
						class="flex gap-2"
					>
						<IconBookOpen class="text-xl" />
						Hybrid
					</button>
				</li>

				<li>
					<button
						class:active={$docLayoutStore == 'render'}
						use:itemAction
						on:click={() => ($docLayoutStore = 'render')}
						class="flex gap-2"
					>
						<IconEye class="text-xl" />
						Render
					</button>
				</li>

				<div class="divider -mb-2 -mt-1 px-1" />

				<li class="menu-title">Actions</li>

				<li>
					<button on:click={dialogController.open} use:itemAction class="flex gap-2">
						<IconShareVariant class="text-xl" />
						Share
					</button>
				</li>

				<li class="text-error hover:text-error">
					<button use:itemAction form="delete-doc" class="flex gap-2" type="submit">
						<IconTrash class="text-xl" />
						Delete
					</button>
				</li>
			</ul>
		</Dropdown>
	</div>

	<input
		type="text"
		style="font-size: 20px"
		class="invisible-input w-full"
		bind:value={form.description}
	/>
</div>

<InkMde
	bind:editor
	bind:value={form.content}
	options={{
		interface: {
			appearance: 'dark',
			toolbar: true,
		},
	}}
/>

{#if docState !== 'base'}
	<button
		transition:scale={{ duration: 150 }}
		on:click={save}
		title="Save changes"
		disabled={docState == 'saving'}
		class="fixed z-90 bottom-[3.125rem] right-5 btn btn-primary btn-circle drop-shadow-lg text-2xl hover:drop-shadow-2xl"
		class:btn-error={docState == 'error'}
		class:btn-outline={docState == 'error'}
	>
		{#if docState == 'saving'}
			<span class="loading loading-spinner" />
		{:else if docState == 'saved'}
			<IconContentSaveCheck class="text-xl" />
		{:else if docState == 'error'}
			<IconContentSaveAlert class="text-xl" />
		{:else if docState == 'edited'}
			<IconContentSave class="text-xl" />
		{/if}
	</button>
{/if}

<Dialog
	bind:close={dialogController.close}
	bind:open={dialogController.open}
	label="Share document"
>
	<div class="flex justify-between items-center">
		<h1 class="text-2xl">Share document</h1>

		<button type="button" class="btn btn-ghost btn-sm" on:click={dialogController.close}>
			<IconClose class="text-xl" />
		</button>
	</div>

	<div class="divider my-1" />

	<div class="flex flex-col gap-2">
		<p>Anyone with this link can <strong>only see</strong> your document!</p>

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

<style lang="postcss">
	.invisible-input {
		border: none;
		outline: none;
		min-width: 0;
		flex: 1;
		padding: 0px 5px;
		@apply leading-3 whitespace-normal bg-base-100 text-base;
	}

	.invisible-input:hover:not(:focus) {
		outline: solid;
		@apply outline-1 outline-gray-500 rounded;
	}

	.invisible-input:focus {
		@apply rounded;
	}
</style>
