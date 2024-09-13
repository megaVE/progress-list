import { z } from 'zod';

export const CharacterRoleZodSchema = z.enum([
    'leader',
    'army_leader',
    'spy',
    'advisor',
    'theorist',
    'chief_of_army',
    'chief_of_navy',
    'chief_of_airforce',
    'military',
]);
