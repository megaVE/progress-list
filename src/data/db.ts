import { DexieDatabase } from './../types/dexie-database.d';

export const database: DexieDatabase = {
    name: 'hoi4database',
    schema: [
        {
            countries: '++id, name, tag',
        },
    ],
};
