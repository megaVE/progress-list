import { z } from 'zod';

export const NewCountryZodSchema = z.object({
    // Country
    tag: z.string().min(3).max(4),
    originalName: z.string().min(1),
    modName: z.string().nullable().default(null),
    //Leader
    modLeader: z.string().nullable().default(null),
});

export type NewCountry = z.infer<typeof NewCountryZodSchema>;
