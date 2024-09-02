import { z } from 'zod';

import { IdeologyZodSchema } from './ideology';

export const CountryVersionZodSchema = z.object({
    originalName: z.string().nullable().default(null),
    modName: z.string().min(1),
    ideology: IdeologyZodSchema,
    hasCustomFlag: z.boolean().default(false),
});

export type CountryVersion = z.infer<typeof CountryVersionZodSchema>;
