import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const { currentUser } = event.locals;

		if (!currentUser) {
			throw redirect(302, '/sign-in');
		}

		const docId = parseInt(event.params.docId, 10);

		const doc = await db.doc.findFirst({
			where: {
				id: docId,
			},
		});

		if (!doc) {
			throw error(404);
		}

		const newDoc = await db.doc.create({
			data: {
				title: doc.title,
				description: doc.description,
				content: doc.content,
				userId: currentUser.id,
			},
		});

		throw redirect(302, `/app/docs/${newDoc.id}`);
	},
};
