import React, {ReactElement} from 'react';
import MinMaxSliders from "./MinMaxSliders";

type ChangeMethods = { [key: string]: () => void };


function Controls(props: ChangeMethods & { takePhoto: (() => void) }): ReactElement {
    const {takePhoto, changeRMin, changeRMax, changeGMin, changeGMax, changeBMin, changeBMax}: ChangeMethods & { takePhoto: (() => void) } = props;
    return <div>
        <button onClick={takePhoto}>Take Photo</button>
        <div className="rgb">
            <MinMaxSliders name="Red" min={0} max={255} updateMin={changeRMin} updateMax={changeRMax}/>
            <br/>
            <MinMaxSliders name="Green" min={0} max={255} updateMin={changeGMin} updateMax={changeGMax}/>
            <br/>
            <MinMaxSliders name="Blue" min={0} max={255} updateMin={changeBMin} updateMax={changeBMax}/>
        </div>
    </div>;
}

export default Controls;
