<<<<<<< HEAD
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
=======
import { Country } from '../types/country';
import { TgaRenderer } from './rendering/tga-renderer';
import { useEffect, useState } from 'react';
import { TGAFile } from '../types/files/tga';
// import { Link } from 'react-router-dom';

import Overlay from '../assets/hoi4-flag-overlay.png';

interface CountryCardProps {
    country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
    const [countryFlag, setCountryFlag] = useState<TGAFile | null>(null);

    const loadCountryFlag = async () => {
        try {
            const countryFlag = await import(`../assets/flags/${country.tag}.tga`);
            setCountryFlag(countryFlag.default);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCountryFlag();
    }, [country.tag]);

    return (
        <div className="m-2 p-2 rounded-lg bg-gray-200 flex space-x-2">
            {/* <Link to={`/${country.tag}`}> */}
            <div className="relative">
                <img
                    className="aspect-[82/52] w-[5.125rem] absolute opacity-90"
                    src={Overlay}
                    alt=""
                />
                <TgaRenderer filePath={countryFlag} />
            </div>
            <div>
                <h2>
                    <span className="font-bold">[{country.tag}] </span>
                    <span className="font-semibold">
                        {country.originalName}{' '}
                    </span>
                    ({country.modName})
                </h2>
                <p>
                    Main Leader:
                    <span className="font-semibold"> {country.modLeader}</span>
                </p>
            </div>
            {/* </Link> */}
        </div>
    );
}
>>>>>>> master
