import Dexie from 'dexie';

export type DexieCreate = (
    tableName: string,
    newEntity: object,
) => Promise<void>;

// export type DexieRead

export type DexieUpdate = (
    tableName: string,
    entityId: string,
    entityUpdate: object,
) => Promise<void>;

export type DexieDelete = (
    tableName: string,
    entityId: string,
) => Promise<void>;

export type DexieImport = (jsonDataBase: JSON | Blob) => Promise<void>;

export type DexieExport = (fileName: string) => Promise<void>;
