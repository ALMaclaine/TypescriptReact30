import React, {ReactElement, SyntheticEvent} from 'react';
import './Plates.css';

export interface Plate {
    text: string,
    done: boolean
}

const fillerElement: ReactElement = <li>Loading Tapas...</li>;

const plateElement = (plate: Plate, markDone: (e: SyntheticEvent) => void): ReactElement => {
    return <li onClick={markDone} key={plate.text}>
        <input onChange={(): void => {}} type="checkbox" checked={plate.done}/>
        <label>{plate.text}</label>
    </li>
}

interface PlatesProps {
    plates: Plate[],
    markDone: (i: number) => void
}

function Plates(props: PlatesProps) {
    const {plates, markDone}: PlatesProps = props;
    return <ul className="plates">
        {plates ? plates.map((e: Plate, i: number): ReactElement => plateElement(e, (e: SyntheticEvent) => markDone(i))) : fillerElement}
    </ul>;
}

export default Plates;
