import { ReactNode } from 'react';
import { useLoopState } from '../../hooks/use-loop-state';

export interface RenderWithLoadingAndErrorProps {
    isLoading: boolean;
    error: boolean | string | null;
    loadingPage?: ReactNode;
    errorPage?: ReactNode;
    children: ReactNode;
}

export function RenderWithLoadingAndError({
    isLoading,
    error,
    loadingPage,
    errorPage,
    children,
}: RenderWithLoadingAndErrorProps) {
    const loopState = useLoopState(['.', '..', '...']);

    if (error) {
        return (
            errorPage || (
                <p>
                    Error
                    {typeof error === 'string'
                        ? `: ${error}`
                        : ' loading info.'}
                </p>
            )
        );
    }

    if (isLoading) {
        return loadingPage || <p>Loading{loopState}</p>;
    }

    return children;
}
