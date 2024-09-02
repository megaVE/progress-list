import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    to?: string;
    disabled?: boolean;
}

export function Button({
    children,
    className,
    to,
    disabled,
    ...props
}: ButtonProps) {
    const ButtonComponent = () => {
        return (
            <button
                className={cn(
                    'font-semibold border border-black rounded-sm px-1 py-0.5 duration-200 bg-opacity-20 hover:bg-opacity-100 cursor-pointer',
                    className,
                )}
                disabled={Boolean(disabled || to)}
                {...props}
            >
                {children}
            </button>
        );
    };

    return to ? (
        <Link to={to}>
            <ButtonComponent />
        </Link>
    ) : (
        <ButtonComponent />
    );
}
