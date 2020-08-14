import React, {ReactElement} from 'react';
import './Strip.css';

function Strip(props: { photos: string[] }): ReactElement {
    const {photos}: { photos: string[] } = props;
    return <div className="strip">
        {photos.map((e: string): ReactElement => {
            return <a key={e.slice(0, 1000)} href={e} download={"handsome"}><img src={e} alt="Handsome Man"/></a>
        })}
    </div>;
}

export default Strip;
