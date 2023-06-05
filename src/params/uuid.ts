import type { ParamMatcher } from '@sveltejs/kit';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

export const match = ((param) => {
	return uuidSchema.safeParse(param).success;
}) satisfies ParamMatcher;
