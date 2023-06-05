import type { ParamMatcher } from '@sveltejs/kit';
import { z } from 'zod';

const idSchema = z.coerce.number().int().positive();

export const match = ((param) => {
	return idSchema.safeParse(param).success;
}) satisfies ParamMatcher;
