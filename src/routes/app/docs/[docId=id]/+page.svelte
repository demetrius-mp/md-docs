<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';

	import DocHeader from '$lib/components/DocHeader.svelte';
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';
	import { parseMarkdown } from '$lib/parseMarkdown.js';
	import { currentDocStore } from '$lib/stores/currentDocStore.js';
	import type { Instance } from 'ink-mde';
	import InkMde from 'ink-mde/svelte';
	import { debounce } from 'lodash';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
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

	let docLayout: 'edit' | 'render' | 'hybrid' = 'hybrid';
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
		const titleIsEdited = doc.title !== data.doc.title;
		const descriptionIsEdited = doc.description !== data.doc.description;
		const contentIsEdited = doc.content !== data.doc.content;

		if (titleIsEdited || descriptionIsEdited || contentIsEdited) {
			docState = 'edited';

			markdownContent = parseMarkdown(form.content);
		}
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

	let markdownContent = parseMarkdown(data.doc.content);
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>

<Pane>
	<div class="fill-height">
		<DocHeader
			bind:docData={form}
			docId={data.doc.id}
			docUuid={data.doc.uuid}
			bind:docLayout
			mode="edit"
		/>

		<Splitpanes>
			{#if docLayout === 'edit' || docLayout === 'hybrid'}
				<Pane>
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
				</Pane>
			{/if}

			{#if docLayout === 'render' || docLayout === 'hybrid'}
				<Pane>
					<div class="fill-height">
						<MarkdownContent
							style="height: calc(100vh - 158px)"
							content={markdownContent}
							class="p-6 overflow-auto"
						/>
					</div>
				</Pane>
			{/if}
		</Splitpanes>
	</div>
</Pane>

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

<style>
	.fill-height {
		height: calc(100vh - 66px);
	}
</style>
