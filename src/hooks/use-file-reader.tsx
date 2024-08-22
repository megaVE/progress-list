import { useState, useEffect } from 'react';

export function useFileReader(jsonFile: File | null): JSON | undefined {
    const [jsonOutput, setJsonOutput] = useState<JSON | undefined>(undefined);

    const reader = new FileReader();

    reader.onload = e => {
        try {
            const result = e.target?.result;
            if (typeof result !== 'string') return;

            const jsonObject = JSON.parse(result);
            setJsonOutput(jsonObject);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!jsonFile) return;
        reader.readAsText(jsonFile);
    }, [jsonFile]);

    return jsonOutput;
}
