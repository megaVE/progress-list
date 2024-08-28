import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    setValue: (newValue: any) => void;
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
            onChange={e => setValue(e.target.value)}
            {...props}
        />
    );
}
