import { detectLocaleFromCookie, LANG_PARAM } from '$lib/i18n.helpers';

export async function load(event) {
	const locale = detectLocaleFromCookie(event.cookies.get(LANG_PARAM));

	return {
		currentUser: event.locals.currentUser,
		locale,
	};
}
