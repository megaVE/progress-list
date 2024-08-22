export function jsonToBlob(jsonObject: JSON | Blob): Blob {
    if (jsonObject instanceof Blob) return jsonObject;

    const jsonString = JSON.stringify(jsonObject);

    return new Blob([jsonString], { type: 'application/json' });
}
