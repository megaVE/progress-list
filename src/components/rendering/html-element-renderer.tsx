import { useEffect, useRef } from 'react';

export interface HtmlElementRendererProps
    extends React.HTMLProps<HTMLDivElement> {
    htmlElement: HTMLElement | null;
}

export function HtmlElementRenderer({
    htmlElement,
    ...props
}: HtmlElementRendererProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current || !htmlElement) return;

        elementRef.current.innerHTML = '';
        elementRef.current.appendChild(htmlElement);
    }, [htmlElement]);

    return <div ref={elementRef} {...props} />;
}
