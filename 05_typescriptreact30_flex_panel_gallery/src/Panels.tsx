import React, {ReactElement} from 'react'
import './Panels.css'
import Panel from './Panel'

function Panels(): ReactElement {
    return <div className="panels">
        <Panel className="panel1">
            <p>Hey</p>
            <p>Let's</p>
            <p>Dance</p>
        </Panel>
        <Panel className="panel2">
            <p>Give</p>
            <p>Take</p>
            <p>Receive</p>
        </Panel>
        <Panel className="panel3">
            <p>Experience</p>
            <p>It</p>
            <p>Today</p>
        </Panel>
        <Panel className="panel4">
            <p>Give</p>
            <p>All</p>
            <p>You can</p>
        </Panel>
        <Panel className="panel5">
            <p>Life</p>
            <p>In</p>
            <p>Motion</p>
        </Panel>
    </div>
}

export default Panels;
