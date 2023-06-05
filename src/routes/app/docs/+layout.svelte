<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Form/Input.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import { currentDocStore } from '$lib/stores/currentDocStore.js';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import IconFileDocumentPlus from '~icons/mdi/FileDocumentPlus';

	export let data;

	let filter = '';

	function filterDoc(doc: (typeof data.docs)[number], filter: string) {
		const title_is_included = doc.title.toLowerCase().includes(filter.toLowerCase());
		const description_is_included = doc.description.toLowerCase().includes(filter.toLowerCase());

		return title_is_included || description_is_included;
	}

	$: filteredDocs = data.docs.filter((doc) => filterDoc(doc, filter));
</script>

<Splitpanes>
	<Pane size={25} snapSize={19}>
		<div class="p-2 flex flex-col gap-3 fill-height">
			<Input placeholder={$LL.form.search()} bind:value={filter} name="filter" />
			<form action="/app/docs/new" method="post" use:enhance>
				<button
					type="submit"
					class="w-full justify-center flex gap-1 btn btn-sm btn-accent btn-outline"
				>
					<IconFileDocumentPlus />
					{$LL.newDoc()}
				</button>
			</form>
			{#if filteredDocs.length == 0}
				<div class="flex items-center justify-center text-base-content">
					{$LL.noDocsFound()}
				</div>
			{:else}
				<ul class="overflow-y-auto flex flex-col gap-2">
					{#each filteredDocs as doc}
						{@const isCurrentDoc = $currentDocStore?.id === doc.id}
						<li>
							<a class="doc-link" class:doc-link-active={isCurrentDoc} href="/app/docs/{doc.id}">
								{#if $currentDocStore && isCurrentDoc}
									{$currentDocStore.title}
								{:else}
									{doc.title}
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</Pane>

	<Pane>
		<div class="fill-height">
			<slot />
		</div>
	</Pane>
</Splitpanes>

<style>
	.fill-height {
		height: calc(100vh - 66px);
	}

	.doc-link {
		@apply block bg-base-200 rounded-box p-3 pl-4 transition duration-200 ease-in-out;
	}

	.doc-link:hover {
		@apply outline-none bg-base-content/10 cursor-pointer;
	}

	.doc-link-active {
		@apply bg-neutral text-neutral-content;
	}
</style>
