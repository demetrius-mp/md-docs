import { detectLocaleFromCookie, LANG_PARAM } from '$lib/i18n.helpers';
import type { LayoutServerLoad } from './$types';

export const load = async function (event) {
	const locale = detectLocaleFromCookie(event.cookies.get(LANG_PARAM));

	return {
		currentUser: event.locals.currentUser,
		locale,
	};
} satisfies LayoutServerLoad;
