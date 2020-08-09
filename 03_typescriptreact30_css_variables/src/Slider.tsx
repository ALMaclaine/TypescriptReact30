import React, {Dispatch, ReactElement, SetStateAction, SyntheticEvent, useState} from 'react';
import './Control.css';

interface SliderProps {
    min: number,
    max: number,
    startingValue: number,
    name: string,
    dataSizing: string
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Slider(props: SliderProps): ReactElement {
    const {min, max, startingValue, name, dataSizing}: SliderProps = props;
    const [value, setValue]: [number, Dispatcher<number>] = useState(startingValue);

    function handleUpdate(e: SyntheticEvent<HTMLInputElement>) {
        const suffix: string = dataSizing || '';
        const value: string = e.currentTarget.value;
        document.documentElement.style.setProperty(`--${name}`, value + suffix);
        setValue(parseInt(value));
    }

    return <>
        <label htmlFor={name}>{`${name[0].toUpperCase() + name.slice(1)}:`}</label>
        <input onChange={() => {
        }} onInput={handleUpdate} type="range" name={name} min={min} max={max} value={value}/>
    </>
}

export default Slider;
