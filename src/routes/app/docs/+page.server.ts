import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const { docs } = await event.parent();

	if (docs.length !== 0) {
		throw redirect(302, `/app/docs/${docs[0].id}`);
	}
}
