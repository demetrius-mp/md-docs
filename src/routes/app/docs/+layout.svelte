<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Form/Input.svelte';
	import LL from '$lib/i18n/i18n-svelte';
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
	<Pane snapSize={19}>
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
				<div class="overflow-y-auto">
					<ul class="menu bg-base-200 rounded-box gap-1 p-2 overflow-hidden">
						{#each filteredDocs as doc}
							<li>
								<a href="/app/docs/{doc.id}">
									{doc.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
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
</style>
