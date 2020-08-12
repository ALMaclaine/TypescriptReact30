import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react';
import Plates, {Plate} from "./Plates";
import AddItems from "./AddItems";

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function PlatesController(): ReactElement {
    const [plates, setPlates]: [Plate[], Dispatcher<Plate[]>] = useState<Plate[]>(JSON.parse(localStorage.getItem('items') || '{}') || []);

    function addItem(newPlate: string): void {
        const item: Plate = {
            text: newPlate,
            done: false
        };
        const tmpPlates: Plate[] = [...plates];
        tmpPlates.push(item);
        setPlates(tmpPlates);
        localStorage.setItem('items', JSON.stringify(tmpPlates));
    }

    function markDone(i: number): void {
        plates[i].done = !plates[i].done
        setPlates([
            ...plates
        ]);
    }

    return <>
        <Plates markDone={markDone} plates={plates}/>
        <AddItems addItem={addItem}/>
    </>;
}

export default PlatesController;
