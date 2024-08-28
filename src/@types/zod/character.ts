import { z } from 'zod';

export const CharacterZodSchema = z.object({
    originalName: z.string().nullable(),
    modName: z.string().nullable(),
    description: z.string(),
});

export type Character = z.infer<typeof CharacterZodSchema>;
