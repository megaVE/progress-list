import styles from './new-country-form.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Country } from '../../../types/country';
import { DexieCreate } from '../../../types/use-dexie';

interface NewCountryFormProps {
    dexieCreate: DexieCreate;
}

export function NewCountryForm({ dexieCreate }: NewCountryFormProps) {
    const { register, handleSubmit } = useForm<Country>();

    const onSubmit: SubmitHandler<Country> = async data => {
        console.log(data);
        await dexieCreate('countries', data);
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
                        Carregar
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
