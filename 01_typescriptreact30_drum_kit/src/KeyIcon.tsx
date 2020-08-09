import React, {ReactElement} from 'react';
import {CSSTransition} from "react-transition-group";

import './KeyIcon.css'

export interface KeyIconProps {
    playing: boolean,
    keyLetter: string,
    keyName: string,
    onEntered: () => void
}

function KeyIcon(props: KeyIconProps): ReactElement {
    const {playing, keyLetter, keyName, onEntered}: KeyIconProps = props;
    const timeout: { [key: string]: number } = {
        appear: 0,
        enter: 70,
        exit: 0,
    };
    const classNames: { [key: string]: string } = {enter: 'playing'}

    return <CSSTransition in={playing}
                          timeout={timeout}
                          classNames={classNames}
                          onEntered={onEntered}
    >
        <div className="key">
            <kbd>{keyLetter}</kbd>
            <span className="sound">{keyName}</span>
        </div>
    </CSSTransition>;
}

export default KeyIcon;
