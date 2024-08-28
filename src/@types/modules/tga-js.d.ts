declare module 'tga-js' {
    export default class TGA {
        open(file: TGAFile, handleFunction: () => void);
        load(buffer: ArrayBuffer);
        getCanvas(): HTMLElement;
    }
}
