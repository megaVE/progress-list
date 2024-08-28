import { z } from 'zod';

import { CharacterZodSchema } from './character';

export const MilitaryLeaderZodSchema = CharacterZodSchema.extend({
    ideaId: z.string().nullable(),
    // isLeader: z.boolean().default(false),
});

export type MilitaryLeader = z.infer<typeof MilitaryLeaderZodSchema>;
