import { redirect } from '@sveltejs/kit';

import { detect_locale_from_cookie, LANG_PARAM } from '$lib/i18n.helpers';

export async function load(event) {
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

	const locale = detect_locale_from_cookie(event.cookies.get(LANG_PARAM));

	return {
		currentUser: event.locals.currentUser,
		locale,
	};
}
