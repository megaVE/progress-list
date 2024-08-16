import { useState } from 'react';

export function useObjectState<T extends object>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    function handleChangeValue(e: { name: string; value: any }) {
        const { name, value } = e;

        if (!initialValue.hasOwnProperty(name)) {
            throw new Error('TODO error log');
        }

        setValue((state: T) => ({
            ...state,
            [name]: value,
        }));
    }

    function handleChangeObject(object: object) {
        setValue((state: any) => ({ ...state, object }));
    }

    function resetObjectState() {
        setValue(initialValue);
    }

    return [value, handleChangeValue, handleChangeObject, resetObjectState];
}
