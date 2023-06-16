import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { LANG_PARAM, getServerLocaleStoreFromCookie } from '$lib/i18n.helpers';
import { getUserFromJwt } from '$lib/server/auth/jwt';
import { redirect } from 'sveltekit-flash-message/server';

const handleUser = async function ({ event, resolve }) {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);
	event.locals.currentUser = user;

	const $LL = getServerLocaleStoreFromCookie(event.cookies.get(LANG_PARAM));

	const routeId = event.route.id;
	if (routeId?.startsWith('/app') && !user) {
		const fromUrl = event.url.pathname + event.url.search;
		throw redirect(
			303,
			`/sign-in?redirectTo=${fromUrl}`,
			{
				kind: 'warning',
				description: $LL.mustBeAuthenticatedToAccessPage(),
			},
			event,
		);
	}

	return await resolve(event);
} satisfies Handle;

const handleLocale = async function ({ event, resolve }) {
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
} satisfies Handle;

export const handle = sequence(handleLocale, handleUser);
