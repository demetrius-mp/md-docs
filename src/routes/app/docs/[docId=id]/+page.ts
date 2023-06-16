import { currentDocStore } from '$lib/stores/currentDocStore';
import type { PageLoad } from './$types';

export const load = function (event) {
	currentDocStore.set(event.data.doc);

	return event.data;
} satisfies PageLoad;
