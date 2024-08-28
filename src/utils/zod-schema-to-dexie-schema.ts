import { ZodObject, ZodRawShape } from 'zod';

export function zodSchemaToDexieSchema<T extends ZodRawShape>(
    zodSchema: ZodObject<T>,
): string {
    const objectKeysArray = Object.keys(zodSchema.shape).filter(
        key => key !== 'id',
    );

    return '++id, ' + objectKeysArray.join(', ');
}
