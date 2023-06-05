import { redirect } from '@sveltejs/kit';

import { getServerLocaleStoreFromCookie, LANG_PARAM } from '$lib/i18n.helpers';
import { db } from '$lib/server/db';

export const actions = {
	default: async (event) => {
		const { currentUser } = event.locals;

		if (!currentUser) {
			throw redirect(302, '/sign-in');
		}

		const $LL = getServerLocaleStoreFromCookie(event.cookies.get(LANG_PARAM));

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
