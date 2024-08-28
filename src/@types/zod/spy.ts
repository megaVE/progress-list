import { z } from 'zod';

import { CharacterZodSchema } from './character';

export const SpyZodSchema = CharacterZodSchema.extend({});

export type Spy = z.infer<typeof SpyZodSchema>;
