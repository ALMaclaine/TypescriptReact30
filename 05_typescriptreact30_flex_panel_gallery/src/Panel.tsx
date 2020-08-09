import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import './Panel.css'
import {CSSTransition} from 'react-transition-group';

interface PanelProps {
    children: ReactElement[],
    className: string
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Panel(props: PanelProps): ReactElement {
    const {children, className}: PanelProps = props;
    const [open, setOpen]: [boolean, Dispatcher<boolean>] = useState<boolean>(false);

    const timeout: {[key: string]: number} = {
        appear: 0,
        enter: 500,
        exit: 700,
    };
    const classNames: {[key: string]: string} = {enter: 'open', enterDone: 'open-active', exit: 'close-active'}

    const finalClassName: string = 'panel' + (className ? ` ${className}` : '');
    return <CSSTransition in={open}
                          timeout={timeout}
                          classNames={classNames}
    >
        <div onClick={() => setOpen(!open)} className={finalClassName}>
            {children}
        </div>
    </CSSTransition>
}

export default Panel;
