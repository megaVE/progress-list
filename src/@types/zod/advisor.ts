import { z } from 'zod';

import { CharacterZodSchema } from './character';

export const AdvisorZodSchema = CharacterZodSchema.extend({
    ideaId: z.string().min(1),
});

export type Advisor = z.infer<typeof AdvisorZodSchema>;
