import { redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db.js';
import type { PageServerLoad } from './$types';

export const load = async function (event) {
	const { docUuid } = event.params;

	const doc = await db.doc.findUnique({
		where: {
			uuid: docUuid,
		},
	});

	if (!doc) {
		throw redirect(302, '/app');
	}

	return {
		doc,
	};
} satisfies PageServerLoad;
