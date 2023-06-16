import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async function (event) {
	if (!event.locals.currentUser) throw redirect(302, '/sign-in');

	return {
		currentUser: event.locals.currentUser,
	};
} satisfies LayoutServerLoad;
