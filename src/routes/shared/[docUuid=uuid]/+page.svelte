<script lang="ts">
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import DocHeader from '$lib/components/DocHeader.svelte';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { onMount } from 'svelte';

	export let data;

	marked.use(gfmHeadingId());

	let markdownContent = '';

	onMount(() => {
		markdownContent = DOMPurify.sanitize(
			marked(data.doc.content, {
				mangle: false,
			}),
		);
	});
</script>

<svelte:head>
	<title>
		{PUBLIC_APP_NAME} - "{data.doc.title}"
	</title>
</svelte:head>

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

<MarkdownContent style="min-height: calc(100vh - 149px);" class="p-6" content={markdownContent} />
