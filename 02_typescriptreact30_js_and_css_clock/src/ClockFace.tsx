import React, {useState, useEffect, Dispatch, SetStateAction, ReactElement, useRef, MutableRefObject} from 'react';
import './ClockFace.css';

import SecondHand from "./SecondHand";
import MinHand from "./MinHand";
import HourHand from "./HourHand";

interface ClockFaceProps {
    updateRate: number
}

interface TimeSet {
    milliseconds: number,
    seconds: number,
    mins: number,
    hours: number
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;
type DispatchNum = Dispatcher<number>;
type NumberDispatchPair = [number, DispatchNum];

function ClockFace(props: ClockFaceProps): ReactElement {
    const {updateRate}: ClockFaceProps = props;
    const [firstDate]: [Date, Dispatcher<Date>] = useState<Date>(new Date());

    const startTimeRef: MutableRefObject<TimeSet> = useRef<TimeSet>({
        milliseconds: firstDate.getMilliseconds(),
        seconds: firstDate.getSeconds(),
        mins: firstDate.getMinutes(),
        hours: firstDate.getHours(),
    });

    const [seconds, setSeconds]: NumberDispatchPair = useState<number>(startTimeRef.current.seconds);
    const [mins, setMins]: NumberDispatchPair = useState<number>(startTimeRef.current.mins);
    const [hours, setHours]: NumberDispatchPair = useState<number>(startTimeRef.current.hours);

    useEffect((): () => void => {
        const startTime: TimeSet = startTimeRef.current;
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
