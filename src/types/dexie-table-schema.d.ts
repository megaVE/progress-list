import { Table } from 'dexie';

export type DexieTableSchema<T> = Table<T, number>;
