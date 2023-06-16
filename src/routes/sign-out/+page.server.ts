import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: ({ cookies }) => {
		cookies.set('jwt', '', {
			path: '/',
			expires: new Date(0),
		});

		throw redirect(302, '/sign-in');
	},
} satisfies Actions;
