import { Country } from '../types/country';

interface CountryCardProps {
    country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
    return (
        <div>
            <h2>
                [{country.tag}] {country.name} (Femjungereich)
            </h2>
            <p>
                Main Leader: <span>Suco Sazmeli</span>
            </p>
        </div>
    );
}
