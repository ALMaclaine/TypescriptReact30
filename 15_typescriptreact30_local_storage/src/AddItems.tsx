import React, {ChangeEvent, Dispatch, ReactElement, SetStateAction, SyntheticEvent, useState} from 'react';
import './AddItems.css';

interface AddItemsProps {
    addItem: (name: string) => void
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function AddItems(props: AddItemsProps): ReactElement {
    const [text, setText]: [string, Dispatcher<string>] = useState('');
    const {addItem}: AddItemsProps = props;

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        setText(e.currentTarget.value);
    }

    function clickHandler(): void {
        addItem(text);
        setText('');
    }

    function keyPressHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            clickHandler();
        }
    }

    return <div className="add-items">
        <input onKeyPress={keyPressHandler} type="text" name="item" placeholder="Item Name" value={text}
               onChange={onChange}/>
        <input type="button" value="+ Add Item" onClick={clickHandler}/>
    </div>;
}

export default AddItems;
