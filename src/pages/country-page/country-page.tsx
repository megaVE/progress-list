import { useParams } from 'react-router-dom';
import { useDexie } from '../../hooks/use-dexie';
import { database } from '../../data/db';
import { useEffect, useState } from 'react';
import { Country } from '../../@types/zod/country';
import { Header } from '../../components/layout/header';
import { TgaRenderer } from '../../components/rendering/tga-renderer';

interface CountryPageProps {}

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
            {tag && <TgaRenderer filePath={`../../assets/flags/${tag}.tga`} />}
            <div></div>
            {countryObject &&
                Object.keys(countryObject).map(key => (
                    <p>
                        {key}: {countryObject[key]}
                    </p>
                ))}
            {countryObject === null && isLoading && <p>Loading...</p>}
            {(countryObject === undefined || error) && <p>Country not found</p>}
        </>
    );
}
