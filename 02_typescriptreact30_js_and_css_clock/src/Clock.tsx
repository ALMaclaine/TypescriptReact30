import React, {ReactElement} from 'react';
import './Clock.css';
import ClockFace from "./ClockFace";

function Clock(): ReactElement {
    return <div className='clock'>
        <ClockFace updateRate={1000}/>
    </div>
}

export default Clock;
