import { ReactNode } from 'react';

interface IconAndTextRendererProps {
    children: ReactNode;
    icon: ReactNode;
    isReverse?: boolean;
    gap?: number;
}

export function IconAndTextRenderer({
    children,
    icon,
    isReverse = false,
    gap = 1,
}: IconAndTextRendererProps) {
    return (
        <div
            className={`flex items-center gap-${gap} ${isReverse ? 'flex-row-reverse' : ''}`}
        >
            {icon}
            {children}
        </div>
    );
}
