import React, {ReactElement} from 'react';
import ClockHand from "./ClockHand";
import './SecondHand.css';

interface SecondHandProps {
    seconds: number
}

function SecondHand(props: SecondHandProps): ReactElement {
    const {seconds}: SecondHandProps = props;
    const secondsDegrees: number = ((seconds / 60) * 360);
    return <ClockHand degrees={secondsDegrees} className='second-hand'/>
}

export default SecondHand;
