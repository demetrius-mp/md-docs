import { PrismaClient } from '@prisma/client';
import { withExclude } from 'prisma-exclude';

export const db = withExclude(new PrismaClient());
