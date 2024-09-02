import { Country } from '../@types/zod/country';

import { CountryCard } from './country-card';

export interface CountriesListProps {
    countriesList: Country[];
}

export function CountriesList({ countriesList }: CountriesListProps) {
    return (
        <>
            {countriesList && (
                <ul>
                    {countriesList.map(country => (
                        <li key={country.id}>
                            <CountryCard country={country} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
