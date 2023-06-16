import { setLocale } from '$lib/i18n/i18n-svelte';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
import type { LayoutLoad } from './$types';

export const load = async function (event) {
	// Locale now comes from the server instead of the route
	const locale = event.data.locale;
	// But we load and set it as before
	await loadLocaleAsync(locale);
	setLocale(locale);

	return event.data;
} satisfies LayoutLoad;
