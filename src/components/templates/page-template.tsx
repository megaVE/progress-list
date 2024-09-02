import { ReactNode } from 'react';
import { Header, HeaderProps } from '../layout/header';
import { Footer, FooterProps } from '../layout/footer';
import { cn } from '../../utils/cn';
import { ClassNameValue } from 'tailwind-merge';

export interface PageTemplateProps {
    children: ReactNode;
    hasDefaultClassName?: boolean;
    containerClassName?: ClassNameValue;
    headerProps?: HeaderProps;
    footerProps?: FooterProps;
}

export function PageTemplate({
    headerProps,
    footerProps,
    hasDefaultClassName = true,
    containerClassName,
    children,
}: PageTemplateProps) {
    const containerDefaultClassName = 'w-full p-4';

    return (
        <>
            <Header {...headerProps} />
            <div
                className={cn(
                    hasDefaultClassName && containerDefaultClassName,
                    containerClassName,
                )}
            >
                {children}
            </div>
            <Footer {...footerProps} />
        </>
    );
}
