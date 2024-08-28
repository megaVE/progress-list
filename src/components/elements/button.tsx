import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'font-semibold border border-black rounded-sm px-1 py-0.5 duration-200 bg-opacity-20 hover:bg-opacity-100',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
