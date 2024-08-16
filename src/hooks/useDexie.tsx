import { useState } from 'react';

import Dexie, { IndexableType } from 'dexie';
import { DexieDatabase } from '../types/dexie-database';

export function useDexie(databaseInfo: DexieDatabase) {
    // Starts the database
    const [db] = useState<Dexie>(() => {
        const db = new Dexie(databaseInfo.name);

        databaseInfo.schema.map((schema, schemaIndex) =>
            db.version(schemaIndex + 1).stores(schema),
        );

        return db;
    });

    async function dexieCreate(tableName: string, newEntity: object) {
        await db.table(tableName).add(newEntity);
    }

    async function dexieRead(
        tableName: string,
        query: { field: string; value: any } | null = null,
    ) {
        if (query === null) {
            const fullTable = await db.table(tableName).toArray();
            return fullTable;
        }

        const filteredTable = db
            .table(tableName)
            .where(query.field)
            .equals(query.value);
        return filteredTable;
    }

    async function dexieUpdate(
        tableName: string,
        entityId: string,
        entityUpdate: object,
    ) {
        await db.table(tableName).update(entityId, entityUpdate);
    }

    async function dexieDelete(tableName: string, entityId: IndexableType) {
        await db.table(tableName).delete(entityId);
    }

    return {
        create: dexieCreate,
        read: dexieRead,
        update: dexieUpdate,
        delete: dexieDelete,
    };
}
