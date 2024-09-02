import { LuCheck, LuX, LuMoreHorizontal } from 'react-icons/lu';

import { Country } from '../@types/zod/country';
import { TgaRenderer } from './rendering/tga-renderer';
import { ReactElement, useEffect, useState } from 'react';
import { TGAFile } from '../@types/files/tga';
import { Link } from 'react-router-dom';

import Overlay from '../assets/hoi4-flag-overlay.png';
import { IconAndTextRenderer } from './rendering/icon-and-text-renderer';
import { CategoryList } from '../@types/zod/category-list';

export interface CountryCardProps {
    country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
    const [countryFlag, setCountryFlag] = useState<TGAFile | null>(null);

    const loadCountryFlag = async () => {
        try {
            const countryFlag = await import(
                `../assets/flags/${country.tag}.tga`
            );
            setCountryFlag(countryFlag.default);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCountryFlag();
    }, [country.tag]);

    const getCategoryProgressIcon: <T extends CategoryList>(
        categoryObject: T,
        keyList: string & keyof T,
    ) => ReactElement = (categoryObject, keyList) => {
        if (categoryObject.isGeneric || categoryObject.isComplete)
            return <LuCheck className="text-green-700" />;

        if (
            Array.isArray(categoryObject[keyList]) &&
            categoryObject[keyList]?.length > 0
        )
            return <LuMoreHorizontal className="text-blue-700" />;

        return <LuX className="text-red-700" />;
    };

    return (
        <Link
            to={`/country/${country.tag.toLowerCase()}`}
            className="m-2 p-2 rounded-lg bg-gray-200 flex items-center space-x-4"
        >
            <div className="relative">
                <img
                    className="aspect-[82/52] w-[5.125rem] absolute opacity-90"
                    src={Overlay}
                    alt=""
                />
                <TgaRenderer filePath={countryFlag} />
            </div>
            <div className="min-w-80">
                <h2>
                    <span className="font-bold">[{country.tag}] </span>
                    <span className="font-semibold">
                        {country.originalName}{' '}
                    </span>
                    ({country.modName})
                </h2>
                <p>
                    Main Leader:
                    <span className="font-semibold">
                        {' '}
                        {country.modLeader || '???'}
                    </span>
                </p>
            </div>
            <div className="border border-l-black px-2">
                <h3 className="font-bold">Progress:</h3>
            </div>
            <ul className="flex space-x-2">
                <li>
                    <IconAndTextRenderer
                        icon={getCategoryProgressIcon(
                            country.altNames,
                            'nameList',
                        )}
                        isReverse={true}
                    >
                        Country Names and Flags:
                    </IconAndTextRenderer>
                </li>
                <li>
                    <IconAndTextRenderer
                        icon={getCategoryProgressIcon(
                            country.countryLeaders,
                            'leaderList',
                        )}
                        isReverse={true}
                    >
                        Leaders:
                    </IconAndTextRenderer>
                </li>
                <li>
                    <IconAndTextRenderer
                        icon={getCategoryProgressIcon(
                            country.armyLeaders,
                            'armyList',
                        )}
                        isReverse={true}
                    >
                        Army:
                    </IconAndTextRenderer>
                </li>
                <li>
                    <IconAndTextRenderer
                        icon={getCategoryProgressIcon(
                            country.navyLeaders,
                            'navyList',
                        )}
                        isReverse={true}
                    >
                        Navy:
                    </IconAndTextRenderer>
                </li>
                <li>
                    <IconAndTextRenderer
                        icon={getCategoryProgressIcon(country.spies, 'spyList')}
                        isReverse={true}
                    >
                        Spies:
                    </IconAndTextRenderer>
                </li>
            </ul>
        </Link>
    );
}
