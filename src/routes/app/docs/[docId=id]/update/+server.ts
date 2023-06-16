import { json, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { db } from '$lib/server/db.js';
import type { RequestHandler } from './$types';

const schema = z.object({
	title: z.string().max(255),
	description: z.string().max(255),
	content: z.string(),
});

export const POST = async function (event) {
	const { currentUser } = event.locals;

	if (!currentUser) {
		throw redirect(302, '/sign-in');
	}

	const data = schema.safeParse(await event.request.json());

	if (!data.success) {
		return json(
			{
				errors: data.error,
			},
			{
				status: 422,
			},
		);
	}

	const docId = parseInt(event.params.docId, 10);

	await db.doc.updateMany({
		data: {
			title: data.data.title,
			description: data.data.description,
			content: data.data.content,
		},
		where: {
			id: docId,
			userId: currentUser.id,
		},
	});

	return new Response(null, {
		status: 200,
	});
} satisfies RequestHandler;
