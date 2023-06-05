import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.currentUser) throw redirect(302, '/sign-in');

	return {
		currentUser: event.locals.currentUser,
	};
}
