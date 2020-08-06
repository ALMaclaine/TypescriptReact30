import React, {ReactElement} from 'react'
import ClockHand from "./ClockHand";
import './HourHand.css';

interface HourHandProps {
    mins: number,
    hours: number
}

function HourHand(props: HourHandProps): ReactElement {
    const {mins, hours}: HourHandProps = props;
    const hourDegrees: number = ((hours / 12) * 360) + ((mins / 60) * 30);
    return <ClockHand degrees={hourDegrees} className='hour-hand' style={{transform: "translateY(-6px)"}}/>
}

export default HourHand;
