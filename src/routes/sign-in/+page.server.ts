import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { generateJwt } from '$lib/server/auth/jwt';
import { verifyPassword } from '$lib/server/auth/password';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

async function findUserByEmail(email: string) {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	return user;
}

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const load = async function (event) {
	if (event.locals.currentUser) {
		throw redirect(302, '/app');
	}

	const form = await superValidate(event, schema);

	return {
		form,
	};
} satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await findUserByEmail(form.data.email);

		if (!user) {
			setError(form, 'email', 'User does not exist or password is invalid');

			return fail(400, { form });
		}

		const passwordIsCorrect = await verifyPassword(form.data.password, user.password);

		if (!passwordIsCorrect) {
			setError(form, 'email', 'User does not exist or password is invalid');

			return fail(400, { form });
		}

		const jwt = generateJwt({
			userId: user.id,
		});

		event.cookies.set('jwt', jwt, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24,
		});

		const redirectTo = event.url.searchParams.get('redirectTo');
		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`);
		}

		throw redirect(302, '/app');
	},
} satisfies Actions;
