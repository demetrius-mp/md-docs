import { get } from 'svelte/store';

import LL, { setLocale } from '$lib/i18n/i18n-svelte';
import type { Locales } from '$lib/i18n/i18n-types';
import { detectLocale } from '$lib/i18n/i18n-util';

export const LANG_PARAM = 'lang';

export function detectLocaleFromCookie(cookie: string | undefined) {
	const locale = detectLocale(() => [cookie ?? '']);

	return locale;
}

export function getServerLocaleStore(locale: Locales) {
	setLocale(locale);

	return get(LL);
}

export function getServerLocaleStoreFromCookie(cookie: string | undefined) {
	const locale = detectLocaleFromCookie(cookie);

	return getServerLocaleStore(locale);
}
