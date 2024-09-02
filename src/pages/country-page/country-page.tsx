import { useParams } from 'react-router-dom';
import { useDexie } from '../../hooks/use-dexie';
import { database } from '../../data/db';
import { useEffect, useState } from 'react';
import { Country } from '../../@types/zod/country';
import { Header } from '../../components/layout/header';
import { TgaRenderer } from '../../components/rendering/tga-renderer';
import { Button } from '../../components/elements/button';
import { IconAndTextRenderer } from '../../components/rendering/icon-and-text-renderer';

import { LuArrowBigLeft } from 'react-icons/lu';

export interface CountryPageProps {}

export function CountryPage({}: CountryPageProps) {
    const { tag: countryTag } = useParams();
    const tag = countryTag?.toUpperCase();

    const { dexie, isLoading, error } = useDexie(database);

    const [countryObject, setCountryObject] = useState<
        Country | null | undefined
    >(null);

    useEffect(() => {
        if (!tag) return setCountryObject(undefined);

        const getCountryInfo = async () => {
            const countryInfo = await dexie.find<Country>('countries', {
                query: { field: 'tag', value: tag },
            });

            setCountryObject(countryInfo);
        };
        getCountryInfo();
    }, []);

    return (
        <>
            <Header />
            <div>
                <Button to="/">
                    <IconAndTextRenderer icon={<LuArrowBigLeft />}>
                        Return
                    </IconAndTextRenderer>
                </Button>
                {tag && (
                    <TgaRenderer filePath={`../../assets/flags/${tag}.tga`} />
                )}
                {countryObject &&
                    Object.keys(countryObject).map(key => (
                        <p>
                            {key}: {countryObject[key]}
                        </p>
                    ))}
                {countryObject === null && isLoading && <p>Loading...</p>}
                {(countryObject === undefined || error) && (
                    <p>Country not found</p>
                )}
            </div>
        </>
    );
}
