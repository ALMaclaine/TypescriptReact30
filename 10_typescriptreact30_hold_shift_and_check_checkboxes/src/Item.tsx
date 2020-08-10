import React, {ReactElement} from 'react';
import './Item.css';

interface ItemProps {
    text: string,
    onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
    checked: boolean
}

function Item(props: ItemProps): ReactElement {
    const {text, onClick, checked}: ItemProps = props;
    return <div className="item">
        <input type="checkbox" onClick={onClick} onChange={() => {
        }} checked={checked || false}/>
        <p>{text}</p>
    </div>;
}

export default Item;
