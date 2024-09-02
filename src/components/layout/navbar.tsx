import { LuArrowBigDown, LuArrowBigUp, LuTrash2 } from 'react-icons/lu';
import { IconAndTextRenderer } from '../rendering/icon-and-text-renderer';

import { useDexie } from '../../hooks/use-dexie';
import { database } from '../../data/db';
import { useEffect, useRef, useState } from 'react';
import { useFileReader } from '../../hooks/use-file-reader';
import { Button } from '../elements/button';

export interface NavbarProps {}

export function Navbar({}: NavbarProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const { exportDataBase, importDataBase } = useDexie(database);

    const [importedDatabaseFile, setImportedDatabaseFile] =
        useState<File | null>(null);
    const importedDatabaseJson = useFileReader(importedDatabaseFile);

    const handleExport = async () => {
        await exportDataBase('database');
    };

    const handleImport = async () => {
        inputFileRef.current?.click();
    };

    const handleLoadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const importedFile = e.target.files?.[0];

        if (!importedFile) return;

        setImportedDatabaseFile(importedFile);
    };

    useEffect(() => {
        if (!importedDatabaseJson || !importedDatabaseFile) return;

        const isImportionConfirmed = window.confirm(
            `Confirm import from ${importedDatabaseFile.name}?`,
        );

        if (!isImportionConfirmed && inputFileRef.current) {
            inputFileRef.current.value = '';
            return setImportedDatabaseFile(null);
        }

        importDataBase(importedDatabaseJson);
    }, [importedDatabaseJson]);

    return (
        <nav className="border border-b-black py-2 px-4 flex items-center space-x-2">
            <Button onClick={handleExport}>
                <IconAndTextRenderer icon={<LuArrowBigDown />}>
                    Export Database
                </IconAndTextRenderer>
            </Button>
            <Button onClick={handleImport}>
                <IconAndTextRenderer icon={<LuArrowBigUp />}>
                    Import Database
                </IconAndTextRenderer>
                <input
                    className="hidden"
                    type="file"
                    ref={inputFileRef}
                    onChange={handleLoadedFile}
                />
            </Button>
            <Button className="red-theme">
                <IconAndTextRenderer icon={<LuTrash2 />}>
                    Delete Database
                </IconAndTextRenderer>
            </Button>
        </nav>
    );
}
