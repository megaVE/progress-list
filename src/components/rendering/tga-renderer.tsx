import TGA from 'tga-js';
import { TGAFile } from '../../@types/files/tga';
import { HtmlElementRenderer } from './html-element-renderer';
import { useEffect, useState } from 'react';
const tga = new TGA();

export interface TgaRendererProps extends React.HTMLProps<HTMLDivElement> {
    filePath: TGAFile | null;
}

export function TgaRenderer({ filePath, ...props }: TgaRendererProps) {
    const [tgaElement, setTgaElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!filePath) return;

        tga.open(filePath, () => {
            const canvas = tga.getCanvas();
            setTgaElement(canvas);
        });
    }, [filePath]);

    return <HtmlElementRenderer htmlElement={tgaElement} {...props} />;
}
