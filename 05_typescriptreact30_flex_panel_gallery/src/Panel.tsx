import React, {useRef, useEffect, ReactElement, MutableRefObject, SyntheticEvent} from 'react'
import './Panel.css'

interface PanelProps {
    children: ReactElement[],
    className: string
}

function Panel(props: PanelProps): ReactElement {
    const {children, className}: PanelProps = props;
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect((): () => void => {
        const toggleOpen = (): void => {
            if(ref.current !== null) {
                ref.current.classList.toggle('open');
            }
        }
        const toggleActive = (e: TransitionEvent): void => {
            if (e.propertyName.includes('flex')) {
                if(ref.current !== null) {
                    ref.current.classList.toggle('open-active');
                }
            }
        }

        if(ref.current !== null) {
            ref.current.addEventListener('click', toggleOpen);
            ref.current.addEventListener('transitionend', toggleActive);
        }

        const current: HTMLDivElement | null = ref.current;

        return (): void => {
            if(current !== null) {
                current.removeEventListener('click', toggleOpen);
                current.removeEventListener('transitionend', toggleActive);
            }
        }
    }, []);

    const finalClassName: string = "panel " + className;
    return <div className={finalClassName} ref={ref}>
        {children}
    </div>
}

export default Panel;
