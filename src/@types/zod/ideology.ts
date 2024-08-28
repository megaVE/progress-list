import { z } from 'zod';

export const IdeologyZodSchema = z.enum([
    'democratic',
    'fascism',
    'communism',
    'neutrality',
]);

export type Ideology = z.infer<typeof IdeologyZodSchema>;
