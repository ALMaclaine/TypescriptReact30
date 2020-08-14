import React, {useRef, useEffect, useState, ReactElement, Dispatch, SetStateAction, MutableRefObject} from 'react';
import './Hero.css';

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

interface Walk {
    walk: number
}

function Hero(): ReactElement {
    const [style, setStyle]: [string, Dispatcher<string>] = useState<string>('initial');
    const heroRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const calcData: MutableRefObject<Walk> = useRef<Walk>({
        walk: 500
    });

    useEffect((): (() => void) => {
        function shadow(e: MouseEvent): undefined | (() => void)  {
            const target: HTMLElement = e.target as HTMLElement;
            const {walk}: Walk = calcData.current;
            if(heroRef.current === null) return;
            const {offsetWidth: width, offsetHeight: height}: { offsetWidth: number, offsetHeight: number } = heroRef.current;
            let {offsetX: x, offsetY: y}: { offsetX: number, offsetY: number } = e;
            x = x + target.offsetLeft;
            y = y + target.offsetTop;

            const xWalk: number = Math.round((x / width * walk) - (walk / 2));
            const yWalk: number = Math.round((y / height * walk) - (walk / 2));

            setStyle(`
              ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
              ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
              ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
              ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
            `);
        }

        window.addEventListener('mousemove', shadow);

        return (): void => {
            window.removeEventListener('mousemove', shadow);
        }
    }, []);

    return <div ref={heroRef} className="hero">
        <h1 style={{textShadow: style}} contentEditable={true} suppressContentEditableWarning={true}>
            <span role="img" aria-label="fire emoji">🔥</span>WOAH!
        </h1>
    </div>;
}

export default Hero;
