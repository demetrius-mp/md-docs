import { db } from '$lib/server/db';

export async function load(event) {
	const { currentUser } = await event.parent();

	const docs = await db.doc.findMany({
		where: {
			userId: currentUser.id,
		},
		select: {
			id: true,
			title: true,
			description: true,
		},
		orderBy: {
			id: 'desc',
		},
	});

	return {
		docs,
	};
}
