import { z } from 'zod';

export const IdeologyZodSchema = z.enum([
    'democratic',
    'fascism',
    'communism',
    'neutrality',
]);
