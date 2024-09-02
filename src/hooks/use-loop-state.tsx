import { useEffect, useState } from 'react';

export function useLoopState<T>(
    stateList: [T, ...Array<T>],
    stateDelay: number = 1000,
): T {
    const [currentState, setCurrentState] = useState<number>(0);

    const changeCurrentState = () => {
        setCurrentState(state =>
            state < stateList.length - 1 ? state + 1 : 0,
        );
    };

    useEffect(() => {
        const loopStateInterval = setInterval(changeCurrentState, stateDelay);

        return () => {
            clearInterval(loopStateInterval);
        };
    }, [stateList, stateDelay]);

    return stateList[currentState];
}
