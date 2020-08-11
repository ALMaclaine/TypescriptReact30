import React, {useState, useEffect, Dispatch, SetStateAction, ReactElement} from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    playPercent: number,
    setTimePercent: (e: number) => void
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function ProgressBar(props: ProgressBarProps): ReactElement {
    const [mouseDown, setMouseDown]: [boolean, Dispatcher<boolean>] = useState<boolean>(false);
    const {playPercent, setTimePercent}: ProgressBarProps = props;
    const scrub = (e: React.MouseEvent<HTMLDivElement>): void => {
        const percent: number = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
        setTimePercent(percent);
    }

    useEffect((): (() => void) => {
        const progress: HTMLElement | null = document.getElementById('progress');
        const mouseup = (): void => setMouseDown(false);
        let rateLimitCounter: number = 0;
        const windowScrub = (e: MouseEvent): void => {
            if(progress !== null) {
                if (rateLimitCounter++ % 5 !== 0) return;
                const percent = e.offsetX / progress.offsetWidth;
                setTimePercent(percent);
            }
        }
        const mousemove = (e: MouseEvent): boolean | void => mouseDown && windowScrub(e);
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mousemove', mousemove)

        return (): void => {
            window.removeEventListener('mouseup', mouseup);
            window.removeEventListener('mousemove', mousemove);
        }
    }, [mouseDown, setTimePercent]);

    return <div id="progress" onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                onClick={scrub}
                className="progress">
        <div className="progress__filled" style={{flexBasis: `${playPercent}%`}}
        />
    </div>;
}

export default ProgressBar;
