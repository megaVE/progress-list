import { LuArrowBigDown, LuArrowBigUp } from 'react-icons/lu';
import { IconAndTextRenderer } from '../rendering/icon-and-text-renderer';

import { useDexie } from '../../hooks/use-dexie';
import { database } from '../../data/db';
import { useEffect, useRef, useState } from 'react';
import { useFileReader } from '../../hooks/use-file-reader';

export function Navbar() {
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
            <button className="btn" onClick={handleExport}>
                <IconAndTextRenderer icon={<LuArrowBigDown />}>
                    Export Database
                </IconAndTextRenderer>
            </button>
            <button className="btn" onClick={handleImport}>
                <IconAndTextRenderer icon={<LuArrowBigUp />}>
                    Import Database
                </IconAndTextRenderer>
                <input
                    className="hidden"
                    type="file"
                    ref={inputFileRef}
                    onChange={handleLoadedFile}
                />
            </button>
        </nav>
    );
}
