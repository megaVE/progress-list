import { useState } from 'react';
import { Input } from '../../../components/elements/input';

import { LuSearch } from 'react-icons/lu';

export function SearchBar() {
    const [query, setQuery] = useState<string>('');

    return (
        <div className="p-2 max-w-min">
            <div className="flex bg-gray-50 border border-black rounded-sm p-1">
                <Input
                    className="bg-transparent"
                    name="query"
                    value={query}
                    placeholder="Search..."
                    setValue={setQuery}
                />
                <button className="text-xl focus:outline-gray-200">
                    <LuSearch />
                </button>
            </div>
        </div>
    );
}
