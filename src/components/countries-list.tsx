<<<<<<< HEAD
import { Country } from '../types/country';

import { CountryCard } from './country-card';

interface CountriesListProps {
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
=======
import { Country } from '../types/country';

import { CountryCard } from './country-card';

interface CountriesListProps {
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
>>>>>>> master
