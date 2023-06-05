import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { getUserFromJwt } from '$lib/server/auth/jwt';

const handleUser = (async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);
	event.locals.currentUser = user;

	const routeId = event.route.id;
	if (routeId?.startsWith('/app')) {
		if (!user) {
			throw redirect(302, '/sign-in');
		}
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleUser);
