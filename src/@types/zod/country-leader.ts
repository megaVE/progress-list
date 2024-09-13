import { z } from 'zod';

import { CharacterZodSchema } from './character';
import { IdeologyZodSchema } from './ideology';

export const CountryLeaderZodSchema = CharacterZodSchema.extend({
    ideaId: z.string().nullable().default(null),
    ideologies: z.array(IdeologyZodSchema).default([]),
});
