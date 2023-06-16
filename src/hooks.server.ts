import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { LANG_PARAM } from '$lib/i18n.helpers';
import { getUserFromJwt } from '$lib/server/auth/jwt';

const handleUser = (async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);
	event.locals.currentUser = user;

	const routeId = event.route.id;
	if (routeId?.startsWith('/app') && !user) {
		throw redirect(302, '/sign-in');
	}

	return await resolve(event);
}) satisfies Handle;

const handleLocale = (async ({ event, resolve }) => {
	const newLocale = event.url.searchParams.get(LANG_PARAM);

	if (newLocale) {
		event.cookies.set(LANG_PARAM, newLocale, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30,
		});

		event.url.searchParams.delete(LANG_PARAM);

		throw redirect(303, event.url.toString());
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleLocale, handleUser);
