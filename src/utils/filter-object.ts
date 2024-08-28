export function filterObject<T extends Object, K extends keyof T>(
    objectToFilter: T,
    desiredFields: Array<K>,
): Pick<T, K> {
    const filteredObject = {} as Pick<T, K>;

    desiredFields.forEach(field =>
        Object.defineProperty(filteredObject, field, {
            value: objectToFilter[field],
            writable: false,
        }),
    );

    return filteredObject;
}
