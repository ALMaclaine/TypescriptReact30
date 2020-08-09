import React, {ReactElement} from 'react';
import './Controls.css';
import Slider from "./Slider";
import ColorPicker from "./ColorPicker";

function Controls(): ReactElement {
    return <div className='controls'>
        <Slider min={10} max={200} startingValue={10} name={'spacing'} dataSizing={'px'}/>
        <Slider min={0} max={25} startingValue={10} name={'blur'} dataSizing={'px'}/>
        <ColorPicker startingValue={"#ffc600"} name={'base'}/>
    </div>
}

export default Controls;
