import React, {forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement} from 'react';
import './Nav.css';

const Nav: ForwardRefRenderFunction<HTMLDivElement, PropsWithChildren<{}>> = (props: PropsWithChildren<{}>, ref): ReactElement => {
    return <nav ref={ref}>
        <ul>
            <li className="logo"><a href="/">LOST.</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Images</a></li>
            <li><a href="/">Locations</a></li>
            <li><a href="/">Maps</a></li>
        </ul>
    </nav>
}

export default forwardRef<HTMLDivElement, PropsWithChildren<{}>>(Nav);
