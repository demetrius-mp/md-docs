/// <reference types="unplugin-icons/types/svelte" />

type Locales = import('$lib/i18n/i18n-types').Locales;
type TranslationFunctions = import('$lib/i18n/i18n-types').TranslationFunctions;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}
		interface PageData {
			flash?: {
				description: string;
				kind: import('$lib/components/Notifications/notificationStore').NotificationKind;
			};
		}
		interface Locals {
			currentUser?: Pick<
				import('@prisma/client').User,
				'id' | 'email' | 'name' | 'profilePictureUrl'
			>;
		}
	}
}

export {};
