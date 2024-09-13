import { z } from 'zod';

export const IdeologyDeclarationZodSchema = z.object({
    democratic: z.array(z.string()),
    communism: z.array(z.string()),
    fascism: z.array(z.string()),
    neutrality: z.array(z.string()),
});
