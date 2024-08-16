// import { CountriesList } from './components/countries-list';
import { useDexie } from './hooks/useDexie';
import { Country } from './types/country';

import { SubmitHandler, useForm } from 'react-hook-form';

import { database } from './data/db';
import { useEffect } from 'react';

export function App() {
    const dexie = useDexie(database);

    useEffect(() => {
        const asyncFunc = async () => {
            const countries = await dexie.read('countries');

            console.log(countries);
        };

        asyncFunc();
    }, [dexie]);

    const { register, handleSubmit } = useForm<Country>();

    const onSubmit: SubmitHandler<Country> = async data => {
        console.log(data);
        await dexie.create('countries', data);
    };

    return (
        <>
            <h1>Hello World</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('name', {
                        required: true,
                    })}
                    placeholder="Country"
                />
                <input
                    {...register('tag', {
                        required: true,
                        minLength: 3,
                        maxLength: 4,
                    })}
                    placeholder="Tag"
                />
                <button type="submit">Enviar</button>
            </form>
            {/* <CountriesList countriesList={countriesList} /> */}
        </>
    );
}
