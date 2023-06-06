import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		cookies.set('jwt', '', {
			path: '/',
			expires: new Date(0),
		});

		throw redirect(302, '/sign-in');
	},
};
