import { useState } from 'react';
import { saveAs } from 'file-saver';

import Dexie, { Collection, Table } from 'dexie';
import { exportDB, importInto } from 'dexie-export-import';
import { DexieDatabase } from '../types/dexie-database';
import {
    DexieCreate,
    DexieDelete,
    DexieExport,
    DexieImport,
    // DexieRead,
    DexieUpdate,
} from '../types/use-dexie';
import { jsonToBlob } from '../utils/json-to-blob';

export function useDexie(databaseInfo: DexieDatabase) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Starts the database
    const [db] = useState<Dexie>(() => {
        const db = new Dexie(databaseInfo.name);

        databaseInfo.schema.map((schema, schemaIndex) =>
            db.version(schemaIndex + 1).stores(schema),
        );

        return db;
    });

    async function handleDexieOperation<T>(
        operation: Promise<T>,
        errorMessage: string = 'Dexie operation error.',
    ): Promise<Awaited<T> | undefined> {
        let output = undefined;

        setIsLoading(true);
        try {
            output = await operation;
        } catch (error) {
            console.error(error);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            return output;
        }
    }

    // CRUD

    const dexieCreate: DexieCreate = async (tableName, newEntity) => {
        const creationPromise = db.table(tableName).add(newEntity);

        await handleDexieOperation(
            creationPromise,
            `Error while creating entity at ${tableName}.`,
        );
    };

    const dexieRead = async <T,>(
        tableName: string,
        { sort }: { sort?: { field: string; order?: 'asc' | 'desc' } } = {},
    ): Promise<Array<T> | undefined> => {
        let readingPromise: Table | Collection = db.table(tableName);

        if (sort) {
            readingPromise = readingPromise.orderBy(sort.field);

            if (sort.order === 'desc') {
                readingPromise = readingPromise.reverse();
            }
        }

        const queryResult = await handleDexieOperation<Array<T> | undefined>(
            readingPromise.toArray(),
            `Error while reading ${tableName}.`,
        );
        return queryResult;
    };

    const dexieUpdate: DexieUpdate = async (
        tableName,
        entityId,
        entityUpdate,
    ) => {
        const updatePromise = db
            .table(tableName)
            .update(entityId, entityUpdate);

        await handleDexieOperation(
            updatePromise,
            `Error updating ${entityId} from ${tableName}.`,
        );
    };

    const dexieDelete: DexieDelete = async (tableName, entityId) => {
        const deletionPromise = db.table(tableName).delete(entityId);

        await handleDexieOperation(
            deletionPromise,
            `Error deleting ${entityId} from ${tableName}`,
        );
    };

    // IMPORT / EXPORT DB

    const dexieImport: DexieImport = async jsonDataBase => {
        const importPromise = async () => {
            await db.delete();
            await db.open();
            await importInto(db, jsonToBlob(jsonDataBase), {
                acceptChangedPrimaryKey: true,
                acceptMissingTables: true,
                acceptNameDiff: true,
                acceptVersionDiff: true,
                overwriteValues: true,
            });
        };

        handleDexieOperation(
            importPromise(),
            `Error importing database from file.`,
        );
    };

    const dexieExport: DexieExport = async fileName => {
        const exportPromise = exportDB(db, {
            prettyJson: true,
        });

        const blob = await handleDexieOperation<Blob>(
            exportPromise,
            `Error exporting database to ${fileName}.json.`,
        );

        if (!blob) return;

        saveAs(blob, `${fileName}.json`);
    };

    return {
        isLoading,
        error,
        dexie: {
            create: dexieCreate,
            read: dexieRead,
            update: dexieUpdate,
            delete: dexieDelete,
        },
        importDataBase: dexieImport,
        exportDataBase: dexieExport,
    };
}
