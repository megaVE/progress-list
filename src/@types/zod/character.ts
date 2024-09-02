import { z } from 'zod';

export const CharacterZodSchema = z.object({
    originalName: z.string().nullable().default(null),
    modName: z.string().nullable().default(null),
    description: z.string().default(''),
});

export type Character = z.infer<typeof CharacterZodSchema>;
