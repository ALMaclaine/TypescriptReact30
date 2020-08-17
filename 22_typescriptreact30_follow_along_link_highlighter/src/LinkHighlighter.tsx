import React, {ReactElement} from 'react';
import './LinkHighlighter.css';
import Menu from "./Menu";
import Wrapper from "./Wrapper";
import Highlighter from "./Highlighter";

function LinkHighlighter(): ReactElement {
    return <>
        <Menu/>
        <Wrapper/>
        <Highlighter/>
    </>;
}

export default LinkHighlighter;
