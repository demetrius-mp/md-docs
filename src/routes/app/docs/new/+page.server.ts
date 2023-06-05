import { redirect } from '@sveltejs/kit';

import { get_server_locale_store_from_cookie, LANG_PARAM } from '$lib/i18n.helpers';
import { db } from '$lib/server/db';

export const actions = {
	default: async (event) => {
		const { currentUser } = event.locals;

		if (!currentUser) {
			throw redirect(302, '/sign-in');
		}

		const $LL = get_server_locale_store_from_cookie(event.cookies.get(LANG_PARAM));

		const doc = await db.doc.create({
			data: {
				content: '',
				title: $LL.docDefaultTitle(),
				description: $LL.docDefaultDescription(),
				userId: currentUser.id,
			},
		});

		throw redirect(302, `/app/docs/${doc.id}`);
	},
};
