import { z } from 'zod';

import { CharacterZodSchema } from './character';
import { IdeologyZodSchema } from './ideology';

export const CountryLeaderZodSchema = CharacterZodSchema.extend({
    ideologies: z.array(IdeologyZodSchema),
    // isArmy: z.boolean().default(false),
    // isAdvisor: z.boolean().default(false),
});

export type CountryLeader = z.infer<typeof CountryLeaderZodSchema>;
