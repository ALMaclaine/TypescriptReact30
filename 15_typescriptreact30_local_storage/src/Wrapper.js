import React from 'react';
import './Wrapper.css';
import PlatesController from "./PlatesController";

function Wrapper(props) {
    return <div className="wrapper">
        <h2>LOCAL TAPAS</h2>
        <PlatesController/>
    </div>;
}

export default Wrapper;
