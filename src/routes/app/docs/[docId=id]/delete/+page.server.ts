import { error, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db.js';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const { currentUser } = event.locals;

		if (!currentUser) {
			throw redirect(302, '/sign-in');
		}

		const docId = parseInt(event.params.docId, 10);

		const res = await db.doc.deleteMany({
			where: {
				id: docId,
				userId: currentUser.id,
			},
		});

		if (res.count === 0) {
			throw error(404);
		}

		const firstDoc = await db.doc.findFirst({
			where: {
				userId: currentUser.id,
			},
			orderBy: {
				id: 'desc',
			},
		});

		if (!firstDoc) {
			throw redirect(302, `/app/docs`);
		}

		throw redirect(302, `/app/docs/${firstDoc.id}`);
	},
} satisfies Actions;
