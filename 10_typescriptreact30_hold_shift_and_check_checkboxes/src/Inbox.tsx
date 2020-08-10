import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react';
import './Inbox.css';
import Item from "./Item";

const texts: string[] = [
    "This is an inbox layout.",
    "Check one item",
    "Hold down your Shift key",
    "Check a lower item",
    "Everything in between should also be set to checked",
    "Try do it without any libraries",
    "Just regular JavaScript",
    "Good Luck!",
    "Don't forget to tweet your result!"
];

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Inbox(): ReactElement {
    const [checked, setChecked]: [boolean[], Dispatcher<boolean[]>] = useState<boolean[]>(Array(texts.length).fill(false));
    const [lastClicked, setLastClicked]: [number, Dispatcher<number>] = useState<number>(-1);
    const clickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, i: number): void => {
        if (e.shiftKey && lastClicked !== -1) {
            const min: number = lastClicked < i ? lastClicked : i;
            const max: number = lastClicked > i ? lastClicked : i;
            let value: boolean = checked[lastClicked];
            for (let i: number = min; i < max; i++) {
                checked[i] = value;
            }
            checked[i] = value;
            setChecked(checked);
        } else {
            setChecked([
                ...checked.slice(0, i),
                !checked[i],
                ...checked.slice(i + 1)
            ]);
        }
        setLastClicked(i);
    }

    return <div className="inbox">
        {texts.map((e: string, i: number) => <Item text={e} checked={checked[i]}
                                                   onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => clickHandler(e, i)}
                                                   key={e}/>)}
    </div>;
}

export default Inbox;
