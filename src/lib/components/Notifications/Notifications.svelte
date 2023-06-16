<script lang="ts">
	import LL from '$lib/i18n/i18n-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import IconAlertCircleOutline from '~icons/mdi/AlertCircleOutline';
	import IconCheckCircleOutline from '~icons/mdi/CheckCircleOutline';
	import IconClose from '~icons/mdi/Close';
	import IconCloseCircleOutline from '~icons/mdi/CloseCircleOutline';
	import IconInformationOutline from '~icons/mdi/InformationOutline';
	import { notificationStore, type Notification, type NotificationKind } from './notificationStore';

	export let notification: Omit<Notification, 'id'> | undefined = undefined;

	const kindToIconMapper: Record<NotificationKind, typeof IconAlertCircleOutline> = {
		error: IconCloseCircleOutline,
		info: IconInformationOutline,
		success: IconCheckCircleOutline,
		warning: IconAlertCircleOutline,
	};

	const kindToClassMapper: Record<NotificationKind, string> = {
		error: 'text-error',
		info: 'text-info',
		success: 'text-success',
		warning: 'text-success',
	};

	$: notifications = notification ? [{ ...notification, id: '-1' }] : [...$notificationStore];

	function closeNotification(id: string) {
		if (id === '-1') notifications = [];
		else notificationStore.close(id);
	}
</script>

<div
	class="left-0 bottom-0 top-auto right-auto fixed flex min-w-fit flex-col gap-2 p-4"
	style="z-index: 9999;"
>
	{#each notifications as { id, description, kind } (id)}
		<div
			animate:flip={{ duration: 250 }}
			transition:fade={{ duration: 150 }}
			class="bg-base-300 w-72 flex flex-col shadow-xl rounded-md"
		>
			<div
				class="flex items-center py-2 px-3 rounded-t-sm border-b border-solid"
				style="border-bottom-color: rgba(255, 255, 255, 0.15);"
			>
				<span class={kindToClassMapper[kind]}>
					<svelte:component this={kindToIconMapper[kind]} />
				</span>
				<strong class="ml-1 mr-auto">
					{$LL.notification.kind[kind]()}
				</strong>
				<button on:click={() => closeNotification(id)}>
					<IconClose />
				</button>
			</div>
			<div class="p-3" style="word-wrap: break-word;">
				{description}
			</div>
		</div>
	{/each}
</div>
