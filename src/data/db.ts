import { DexieDatabase } from './../types/dexie-database.d';

export const database: DexieDatabase = {
    name: 'hoi4database',
    schema: [
        {
            countries: '++id, tag, originalName, modName, modLeader',
        },
    ],
};
