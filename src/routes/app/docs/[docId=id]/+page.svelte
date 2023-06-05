<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { writable } from 'svelte/store';

	import DocHeader from '$lib/components/DocHeader.svelte';
	import { currentDocStore } from '$lib/stores/currentDocStore.js';
	import type { Instance } from 'ink-mde';
	import InkMde from 'ink-mde/svelte';
	import { debounce } from 'lodash';
	import { scale } from 'svelte/transition';
	import IconContentSave from '~icons/mdi/ContentSave';
	import IconContentSaveAlert from '~icons/mdi/ContentSaveAlert';
	import IconContentSaveCheck from '~icons/mdi/ContentSaveCheck';

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

			$currentDocStore = data.doc;
		} else {
			docState = 'error';
		}
	}
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>

<DocHeader
	bind:docData={form}
	docId={data.doc.id}
	docUuid={data.doc.uuid}
	bind:docLayout={$docLayoutStore}
	mode="edit"
/>

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
