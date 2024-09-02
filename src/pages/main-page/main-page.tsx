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
import { Button } from '../../components/elements/button';
import { PageTemplate } from '../../components/templates/page-template';

export interface MainPageProps {}

export function MainPage({}: MainPageProps) {
    const { dexie, isLoading, error } = useDexie(database);

    const [isCreatingCountry, setIsCreatingCountry] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
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

    const filteredCountryList = countriesList?.filter(country =>
        country.tag.includes(query),
    );

    return (
        <PageTemplate hasDefaultClassName={false}>
            {/* Create Country Bar */}
            <div className="w-full p-4 border border-b-black">
                <Button
                    className={`${isCreatingCountry ? 'bg-gray-200' : 'bg-green-400'} min-w-40`}
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
                </Button>
                {isCreatingCountry && (
                    <NewCountryForm dexieCreate={dexie.create} />
                )}
            </div>
            <Navbar />
            <div className="p-2">
                {isLoading && <p>Loading available countries...</p>}
                {error && <p>Error loading countries</p>}
                {filteredCountryList && (
                    <>
                        <SearchBar queryState={[query, setQuery]} />
                        <CountriesList countriesList={filteredCountryList} />
                    </>
                )}
            </div>
        </PageTemplate>
    );
}
