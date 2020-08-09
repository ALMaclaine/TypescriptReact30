import React, {Dispatch, ReactElement, SetStateAction, SyntheticEvent, useState} from 'react';
import './Control.css';

interface ColorPickerProps {
    startingValue: string,
    name: string,
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function ColorPicker(props: ColorPickerProps): ReactElement {
    const {startingValue, name}: ColorPickerProps = props;
    const [value, setValue]: [string, Dispatcher<string>] = useState(startingValue);

    function handleUpdate(e: SyntheticEvent<HTMLInputElement>) {
        const value: string = e.currentTarget.value;
        document.documentElement.style.setProperty(`--${name}`, value);
        setValue(value);
    }

    return <>
        <label htmlFor={name}>{`${name[0].toUpperCase() + name.slice(1)}:`}</label>
        <input onChange={(): void => {}}
               onInput={handleUpdate} type="color" name={name} value={value} style={{position: "relative", top: "-6px"}}/>
    </>
}

export default ColorPicker;
