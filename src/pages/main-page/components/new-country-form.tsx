import styles from './new-country-form.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';
import { DexieCreate } from '../../../@types/use-dexie';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewCountryZodSchema } from '../../../@types/zod/new-country';
import { CountryZodSchema } from '../../../@types/zod/country';

export interface NewCountryFormProps {
    dexieCreate: DexieCreate;
}

export function NewCountryForm({ dexieCreate }: NewCountryFormProps) {
    type Country = z.infer<typeof CountryZodSchema>;
    type NewCountry = z.infer<typeof NewCountryZodSchema>;

    const { register, handleSubmit } = useForm<NewCountry>({
        resolver: zodResolver(NewCountryZodSchema),
    });

    const onSubmit: SubmitHandler<NewCountry> = async data => {
        const newCountryObject = CountryZodSchema.parse(data);

        await dexieCreate<Country>('countries', newCountryObject);
    };

    return (
        <div className="my-4 border border-black rounded-md">
            <form className="flex" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.column}>
                    <input
                        className={styles.input}
                        {...register('originalName', {
                            required: true,
                        })}
                        placeholder="Country *"
                    />
                    <input
                        className={styles.input}
                        {...register('tag', {
                            required: true,
                            minLength: 3,
                            maxLength: 4,
                        })}
                        placeholder="Tag *"
                    />
                    <button
                        type="submit"
                        className="font-semibold bg-gray-600 text-white py-1 duration-200 hover:bg-gray-700"
                    >
                        Create
                    </button>
                </div>
                <div className={styles.column}>
                    <input
                        className={styles.input}
                        {...register('modName', {})}
                        placeholder="New Country Name"
                    />
                    <input
                        className={styles.input}
                        {...register('modLeader', {})}
                        placeholder="New Leader Name"
                    />
                </div>
            </form>
        </div>
    );
}
