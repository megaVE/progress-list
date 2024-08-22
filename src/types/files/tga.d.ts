declare module '*.tga' {
    const value: string;
}

export type TGAFile = typeof import('*.tga');
