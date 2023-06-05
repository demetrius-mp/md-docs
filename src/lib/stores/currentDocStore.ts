import type { Doc } from '@prisma/client';
import { writable } from 'svelte/store';

export const currentDocStore = writable<Doc | null>(null);
