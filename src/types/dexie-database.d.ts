import { DexieSchema } from './dexie-schema';

export type DexieDatabase = {
    name: string;
    schema: DexieSchema[];
};
