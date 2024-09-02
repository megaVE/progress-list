import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    setValue:
        | ((newValue: any) => void)
        | ((newValue: any, valueName: string) => void);
}

export function Input({
    name,
    type = 'text',
    value,
    setValue,
    ...props
}: InputProps) {
    return (
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={e => setValue(e.target.value, e.target.name)}
            {...props}
        />
    );
}
