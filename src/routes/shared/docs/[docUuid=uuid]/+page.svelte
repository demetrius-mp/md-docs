<script lang="ts">
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Container from '$lib/components/Container.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import LL from '$lib/i18n/i18n-svelte.js';
	import { parseMarkdown } from '$lib/parseMarkdown.js';
	import { onMount } from 'svelte';
	import IconContentCopy from '~icons/mdi/ContentCopy';
	import IconDotsVertical from '~icons/mdi/DotsVertical';
	import IconFileDocument from '~icons/mdi/FileDocument';
	import type { PageData } from './$types';

	export let data: PageData;

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
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-1 min-w-0 flex-1">
				<IconFileDocument class="text-3xl" />

				<h1 class="text-3xl p-1">{data.doc.title}</h1>
			</div>

			{#if data.currentUser}
				<Dropdown label="Actions dropdown">
					<button class="btn btn-ghost btn-square" slot="button" let:buttonAction use:buttonAction>
						<IconDotsVertical class="text-2xl" />
					</button>

					<ul
						slot="menuItems"
						let:itemAction
						class="gap-1 z-50 menu bg-base-300 w-56 p-3 rounded-box"
					>
						<li class="menu-title">
							{$LL.docActions.actions()}
						</li>

						<li>
							<button form="create-copy" type="submit" use:itemAction class="flex gap-2">
								<IconContentCopy class="text-xl" />
								{$LL.docActions.createCopy()}
							</button>
						</li>
					</ul>
				</Dropdown>
			{/if}
		</div>

		<p class="text-xl px-1">{data.doc.description}</p>
	</div>

	<div class="divider mb-0" />

	<MarkdownContent style="min-height: calc(100vh - 149px);" class="p-2" content={markdownContent} />
</Container>
