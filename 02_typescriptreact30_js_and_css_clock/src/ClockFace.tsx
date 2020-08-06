import React, {useState, useEffect, Dispatch, SetStateAction, ReactElement} from 'react';
import './ClockFace.css';

import SecondHand from "./SecondHand";
import MinHand from "./MinHand";
import HourHand from "./HourHand";

interface ClockFaceProps {
    updateRate: number
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;
type DispatchNum = Dispatcher<number>;
type NumberDispatchPair = [number, DispatchNum];

function ClockFace(props: ClockFaceProps): ReactElement {
    const {updateRate}: ClockFaceProps = props;
    const [firstDate]: [Date, Dispatcher<Date>] = useState(new Date());

    const startTime: {[key: string]: number} = {
        milliseconds: firstDate.getMilliseconds(),
        seconds: firstDate.getSeconds(),
        mins: firstDate.getMinutes(),
        hours: firstDate.getHours(),
    };

    const [seconds, setSeconds]: NumberDispatchPair = useState(startTime.seconds);
    const [mins, setMins]: NumberDispatchPair = useState(startTime.mins);
    const [hours, setHours]: NumberDispatchPair = useState(startTime.hours);

    useEffect((): () => void => {
        let currentDate: Date = firstDate;
        let ellapsedMilliseconds: number = 0;

        function updateLastDate(): void {
            const newDate: Date = new Date();
            const dateDiff: number = (newDate.getTime() - currentDate.getTime());
            currentDate = newDate;
            ellapsedMilliseconds += dateDiff;
            const seconds: number = startTime.seconds + (startTime.milliseconds / 1000) + ellapsedMilliseconds / 1000;
            const mins: number = startTime.mins + (ellapsedMilliseconds / 60000);
            const hour = startTime.hours + (ellapsedMilliseconds / 3600000);
            setSeconds(seconds);
            setMins(mins);
            setHours(hour);
        }

        const timer: number = window.setInterval(updateLastDate, updateRate);

        return (): void => clearInterval(timer);
    }, [firstDate, updateRate]);


    return <div className='clock-face'>
        <HourHand mins={mins} hours={hours}/>
        <MinHand seconds={seconds} mins={mins}/>
        <SecondHand seconds={seconds}/>
    </div>
}

export default ClockFace;
