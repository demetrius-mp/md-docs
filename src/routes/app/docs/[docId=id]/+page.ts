import type { Doc } from '@prisma/client';
import type { Writable } from 'svelte/store';

import { currentDocStore } from '$lib/stores/currentDocStore.js';

export function load(event) {
	currentDocStore.set(event.data.doc);

	return {
		...event.data,
		currentDocStore: currentDocStore as Writable<Doc>,
	};
}
