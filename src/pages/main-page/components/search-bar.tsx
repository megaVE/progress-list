import { StateArray } from '../../../@types/state-array';
import { Input } from '../../../components/elements/input';

import { LuSearch } from 'react-icons/lu';

export interface SearchBarProps {
    queryState: StateArray<string>;
}

export function SearchBar({ queryState }: SearchBarProps) {
    const [query, setQuery] = queryState;

    return (
        <div className="p-2 max-w-min">
            <div className="flex space-x-1 bg-gray-50 border border-black rounded-sm p-1">
                <Input
                    className="bg-transparent"
                    name="query"
                    value={query}
                    placeholder="Search..."
                    setValue={setQuery}
                />
                <div className="w-px h-auto bg-black" />
                <button className="text-xl focus:outline-gray-200">
                    <LuSearch />
                </button>
            </div>
        </div>
    );
}
