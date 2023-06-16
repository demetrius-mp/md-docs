import { error } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = async function (event) {
	const docId = parseInt(event.params.docId, 10);

	const doc = await db.doc.findUnique({
		where: {
			id: docId,
		},
	});

	if (!doc) {
		throw error(404);
	}

	return {
		doc,
	};
} satisfies PageServerLoad;
