import React, {MutableRefObject, ReactElement, useEffect, useRef} from 'react';
import './Highlighter.css';

function Highlighter(): ReactElement {
    const highlightRef: MutableRefObject<HTMLSpanElement | null> = useRef<HTMLSpanElement | null>(null);
    const positionData: MutableRefObject<{ [key: string]: number }> = useRef<{ [key: string]: number }>({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    });

    useEffect((): () => void => {
        const triggers: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');

        function highlightLink(this: HTMLAnchorElement, ev: MouseEvent): void {
            const linkCoords: ClientRect = this.getBoundingClientRect();
            console.log(linkCoords);
            positionData.current = {
                width: linkCoords.width,
                height: linkCoords.height,
                top: linkCoords.top + window.scrollY,
                left: linkCoords.left + window.scrollX
            };
            if (highlightRef.current === null) return;
            highlightRef.current.style.width = `${positionData.current.width}px`;
            highlightRef.current.style.height = `${positionData.current.height}px`;
            highlightRef.current.style.transform = `translate(${positionData.current.left}px, ${positionData.current.top}px)`;
        }

        triggers.forEach((a: HTMLAnchorElement) => a.addEventListener('mouseenter', highlightLink));

        return (): void => {
            triggers.forEach((a: HTMLAnchorElement) => a.removeEventListener('mouseenter', highlightLink));
        }
    }, []);

    return <span className="highlight" ref={highlightRef}/>;
}

export default Highlighter;
