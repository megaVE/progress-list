import { z } from 'zod';
import { ArmyRolesZodSchema } from '../zod/army-roles';
import { AdvisorRolesZodSchema } from '../zod/advisor-roles';

export const CharacterDeclarationZodSchema = z.object({
    is_country_leader: z.boolean(),
    army_role: ArmyRolesZodSchema,
    is_navy_leader: z.boolean(),
    advisor_role: AdvisorRolesZodSchema,
    name: z.string(),
});
