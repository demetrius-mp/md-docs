import { get } from 'svelte/store';

import LL, { setLocale } from '$lib/i18n/i18n-svelte';
import type { Locales } from '$lib/i18n/i18n-types';
import { detectLocale } from '$lib/i18n/i18n-util';

export const LANG_PARAM = 'lang';

export function detect_locale_from_cookie(cookie: string | undefined) {
	const locale = detectLocale(() => [cookie ?? '']);

	return locale;
}

export function get_server_locale_store(locale: Locales) {
	setLocale(locale);

	return get(LL);
}

export function get_server_locale_store_from_cookie(cookie: string | undefined) {
	const locale = detect_locale_from_cookie(cookie);

	return get_server_locale_store(locale);
}
