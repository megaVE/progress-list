import { z } from 'zod';

export const CategoryListZodSchema = z.object({
    isGeneric: z.boolean().default(false),
    isComplete: z.boolean().default(false),
});
