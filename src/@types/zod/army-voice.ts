import { z } from 'zod';

export const ArmyVoiceZodSchema = z.object({
    isAvaliable: z.boolean().default(false),
    model: z
        .object({
            modelName: z.string().min(1),
            modelSource: z.string().min(1),
        })
        .nullable()
        .default(null),
});
