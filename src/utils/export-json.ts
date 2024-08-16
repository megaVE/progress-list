import { saveAs } from 'file-saver';

interface exportJsonParams {
    name: string;
    content: object;
}

export function exportJson({ name, content }: exportJsonParams) {
    const jsonContent = JSON.stringify(content);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    saveAs(blob, `${name}.json`);
}
