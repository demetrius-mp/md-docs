<script lang="ts">
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Container from '$lib/components/Container.svelte';
	import DocHeader from '$lib/components/DocHeader.svelte';
	import { parseMarkdown } from '$lib/parseMarkdown.js';
	import { onMount } from 'svelte';

	export let data;

	let markdownContent = '';

	onMount(() => {
		markdownContent = parseMarkdown(data.doc.content);
	});
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>

<Container>
	<DocHeader
		docData={{
			title: data.doc.title,
			description: data.doc.description,
			content: data.doc.content,
		}}
		docId={data.doc.id}
		docUuid={data.doc.uuid}
		mode="show"
	/>

	<div class="divider mb-0" />

	<MarkdownContent style="min-height: calc(100vh - 149px);" class="p-2" content={markdownContent} />
</Container>
