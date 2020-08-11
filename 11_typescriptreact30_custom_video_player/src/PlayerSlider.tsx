import React, {ChangeEvent, ReactElement} from 'react';
import './PlayerSlider.css';

interface PlayerSlider {
    name: string,
    min: number,
    max: number,
    step: number,
    update: (e: number) => void,
    value: number
}

function PlayerSlider(props: PlayerSlider): ReactElement {
    const {name, min, max, step, update, value}: PlayerSlider = props;
    return <input onChange={(e: ChangeEvent<HTMLInputElement>) => update(parseFloat(e.currentTarget.value))}
                  type="range" name={name} className="player__slider" min={min}
                  max={max} step={step} value={value}/>;
}

export default PlayerSlider;
