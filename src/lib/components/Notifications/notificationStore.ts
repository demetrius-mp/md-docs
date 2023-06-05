import { writable } from 'svelte/store';

export type NotificationKind = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
	id: string;
	description: string;
	kind?: NotificationKind;
	removeAfter?: number;
};

function createNotificationStore() {
	const { subscribe, update } = writable<Notification[]>([]);

	function delete_notification(id: string) {
		update((all) => all.filter((toast) => toast.id !== id));
	}

	return {
		subscribe,
		close: delete_notification,
		push(data: Omit<Notification, 'id'>) {
			const id = new Date().valueOf() + data.description;
			const newNotification: Notification = {
				...data,
				id,
			};

			update((all) => {
				return [...all, newNotification];
			});

			if (data.removeAfter !== undefined) {
				setTimeout(() => {
					delete_notification(id);
				}, data.removeAfter);
			}

			return id;
		},
	};
}

export const notificationStore = createNotificationStore();
