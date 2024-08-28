import { DexieDatabase } from '../@types/dexie-database';

import { zodSchemaToDexieSchema } from '../utils/zod-schema-to-dexie-schema';

import { CountryZodSchema } from '../@types/zod/country';

export const database: DexieDatabase = {
    name: 'hoi4database',
    schema: [
        {
            countries: zodSchemaToDexieSchema(CountryZodSchema),
        },
    ],
};
