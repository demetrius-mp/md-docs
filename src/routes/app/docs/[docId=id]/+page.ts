import { currentDocStore } from '$lib/stores/currentDocStore.js';

export function load(event) {
	currentDocStore.set(event.data.doc);

	return event.data;
}
