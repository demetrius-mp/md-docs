import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async function (event) {
	const { docs } = await event.parent();

	if (docs.length !== 0) {
		throw redirect(302, `/app/docs/${docs[0].id}`);
	}
} satisfies PageServerLoad;
