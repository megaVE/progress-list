interface MainPageProps {}

import { Header } from '../../components/layout/header';
import { useDexie } from '../../hooks/use-dexie';
import { database } from '../../data/db';
import { useEffect, useState } from 'react';
import { NewCountryForm } from './components/new-country-form';
import { Country } from '../../@types/zod/country';

import { LuPlus, LuMinus } from 'react-icons/lu';
import { CountriesList } from '../../components/countries-list';
import { Navbar } from '../../components/layout/navbar';
import { IconAndTextRenderer } from '../../components/rendering/icon-and-text-renderer';
import { SearchBar } from './components/search-bar';

export function MainPage({}: MainPageProps) {
    const { dexie } = useDexie(database);

    const [isCreatingCountry, setIsCreatingCountry] = useState<boolean>(false);
    const [countriesList, setCountriesList] = useState<Country[] | null>(null);

    useEffect(() => {
        const asyncFunc = async () => {
            const countries = await dexie.read<Country>('countries', {
                sort: { field: 'tag' },
            });

            console.log(countries);

            if (!countries) return;

            setCountriesList(countries);
        };

        asyncFunc();
    }, [database]);

    return (
        <>
            <Header />
            {/* Create Country Bar */}
            <div className="w-full p-4 border border-b-black">
                <button
                    className={`${isCreatingCountry ? 'bg-gray-200' : 'bg-green-400'} btn min-w-40`}
                    onClick={() => setIsCreatingCountry(state => !state)}
                >
                    <div className="flex items-center gap-1">
                        {isCreatingCountry ? (
                            <IconAndTextRenderer icon={<LuMinus />}>
                                Cancel
                            </IconAndTextRenderer>
                        ) : (
                            <IconAndTextRenderer icon={<LuPlus />}>
                                Create Country
                            </IconAndTextRenderer>
                        )}
                    </div>
                </button>
                {isCreatingCountry && (
                    <NewCountryForm dexieCreate={dexie.create} />
                )}
            </div>
            <Navbar />
            <div className="p-2">
                {countriesList ? (
                    <>
                        <SearchBar />
                        <CountriesList countriesList={countriesList} />
                    </>
                ) : (
                    <p>Nothing</p>
                )}
            </div>
        </>
    );
}
