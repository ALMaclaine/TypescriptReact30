import React, {useState, useRef, Dispatch, SetStateAction, MutableRefObject, ChangeEvent, ReactElement} from 'react'

interface MinMaxSlidersProps {
    name: string,
    min: number,
    max: number,
    updateMin: (n: number) => void,
    updateMax: (n: number) => void
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function MinMaxSliders(props: MinMaxSlidersProps): ReactElement {
    const { name, min, max, updateMin, updateMax}: MinMaxSlidersProps = props;
    const [minVal, setMinVal]: [number, Dispatcher<number>] = useState<number>(min);
    const [maxVal, setMaxVal]: [number, Dispatcher<number>] = useState<number>(128);
    const minRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const maxRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    const minHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const val = parseInt(e.currentTarget.value);
        if(val <= maxVal) {
            updateMin(val);
            setMinVal(val);
        }
    }

    const maxHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const val = parseInt(e.currentTarget.value);
        if(minVal <= val) {
            updateMax(val);
            setMaxVal(val);
        }
    }

    return <>
            <label>{name} Min:</label>
            <input ref={minRef} onChange={minHandler} type="range" min={min} max={max} value={minVal}/>
            <label>{name} Max:</label>
            <input ref={maxRef} onChange={maxHandler} type="range" min={min} max={max} value={maxVal}/>
        </>;
}

export default MinMaxSliders;
