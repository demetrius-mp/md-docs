<script lang="ts">
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	import IconFileDocument from '~icons/mdi/FileDocument';

	import { PUBLIC_APP_NAME } from '$env/static/public';
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

<div class="p-2 flex flex-col gap-1">
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-1 min-w-0 flex-1">
			<IconFileDocument class="text-3xl" />

			<input
				disabled
				type="text"
				style="font-size: 32px"
				class="invisible-input hover:!outline-none"
				value={data.doc.title}
			/>
		</div>
	</div>

	<input
		type="text"
		style="font-size: 20px"
		disabled
		class="invisible-input w-full hover:!outline-none"
		value={data.doc.description}
	/>
</div>

<MarkdownContent style="min-height: calc(100vh - 149px);" class="p-6" content={markdownContent} />
