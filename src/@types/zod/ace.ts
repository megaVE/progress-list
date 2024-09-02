import { z } from 'zod';

import { CharacterZodSchema } from './character';

export const AceZodSchema = CharacterZodSchema.extend({});

export type Ace = z.infer<typeof AceZodSchema>;
