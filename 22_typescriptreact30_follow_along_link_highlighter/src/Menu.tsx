import React, {ReactElement} from 'react';
import './Menu.css';

function Menu(): ReactElement {
    return <nav>
        <ul className="menu">
            <li><a href="/">Home</a></li>
            <li><a href="/">Order Status</a></li>
            <li><a href="/">Tweets</a></li>
            <li><a href="/">Read Our History</a></li>
            <li><a href="/">Contact Us</a></li>
        </ul>
    </nav>;
}

export default Menu;
