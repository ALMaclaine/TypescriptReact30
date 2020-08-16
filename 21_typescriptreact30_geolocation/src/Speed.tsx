import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import './Speed.css';

interface SpeedProps {
    setHeading: (n: number) => void
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Speed(props: SpeedProps): ReactElement {
    const [speed, setSpeed]: [number, Dispatcher<number>] = useState<number>(0);
    const {setHeading}: SpeedProps = props;

    useEffect((): void => {
        const navigatorHandler = (speed: number, heading: number) => {
            setSpeed(speed);
            setHeading(heading);
        };

        navigator.geolocation.watchPosition((data: Position) => {
            navigatorHandler(data.coords.speed || 0, data.coords.heading || 0);
        }, (err: PositionError) => {
            console.error(err);
        });
    }, [setHeading]);

    return <h1 className="speed">
        <span className="speed-value">{speed}</span>
        <span className="units">KM/H</span>
    </h1>;
}

export default Speed;
