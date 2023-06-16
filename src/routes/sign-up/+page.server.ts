import { createHash } from 'node:crypto';

import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { generateJwt } from '$lib/server/auth/jwt';
import { generatePasswordHash } from '$lib/server/auth/password';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

function getMd5Hash(content: string) {
	return createHash('md5').update(content).digest('hex');
}

function getGravatarImage(email: string) {
	const hash = getMd5Hash(email);

	return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}

async function findUserByEmail(email: string) {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	return user;
}

const schema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
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

		if (form.data.password !== form.data.confirmPassword) {
			setError(form, 'confirmPassword', "Passwords don't match");

			return fail(400, { form });
		}

		const existingUser = await findUserByEmail(form.data.email);

		if (existingUser) {
			setError(form, 'email', 'This email is already being used');

			return fail(400, { form });
		}

		const gravatarImage = getGravatarImage(form.data.email);

		const user = await db.user.create({
			data: {
				email: form.data.email,
				name: form.data.name,
				password: await generatePasswordHash(form.data.password),
				profilePictureUrl: gravatarImage,
			},
		});

		const jwt = generateJwt({
			userId: user.id,
		});

		event.cookies.set('jwt', jwt, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30,
		});

		throw redirect(302, '/app');
	},
} satisfies Actions;
