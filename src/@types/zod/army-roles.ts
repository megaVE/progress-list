import { z } from 'zod';

export const ArmyRolesZodSchema = z
    .enum(['general', 'field_marshal'])
    .nullable();
