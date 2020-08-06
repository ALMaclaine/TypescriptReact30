import React, {ReactElement} from 'react';
import './ClockHand.css';

interface ClockHandProps {
    degrees: number,
    style?: {[key: string]: string},
    className?: string
}

function ClockHand(props: ClockHandProps): ReactElement {
    const {degrees, style, className}: ClockHandProps = props;
    let transform: string = `rotate(${degrees}deg)`;
    if (style && style.transform) {
        transform += ` ${style.transform}`;
    }
    const finalClass: string = 'hand' + (className ? ` ${className}`: '');
    return <div className={finalClass} style={{transform}}/>
}

export default ClockHand;
