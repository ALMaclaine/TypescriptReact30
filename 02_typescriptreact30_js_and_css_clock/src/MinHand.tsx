import React, {ReactElement} from 'react'
import ClockHand from "./ClockHand";

interface MinHandProps {
    seconds: number,
    mins: number
}

function MinHand(props: MinHandProps): ReactElement {
    const {seconds, mins}: MinHandProps = props;
    const minsDegrees: number = ((mins / 60) * 360) + ((seconds / 60) * 6);
    return <ClockHand degrees={minsDegrees}/>
}

export default MinHand;
