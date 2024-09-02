import { saveAs } from 'file-saver';

import { jsonToBlob } from './json-to-blob';

export interface exportJsonParams {
    name: string;
    content: JSON | Blob;
}

export function exportJson({ name, content }: exportJsonParams): void {
    const blob = content instanceof Blob ? content : jsonToBlob(content);

    saveAs(blob, `${name}.json`);
}
