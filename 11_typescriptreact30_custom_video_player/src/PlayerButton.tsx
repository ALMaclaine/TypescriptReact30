import React from 'react';
import './PlayerButton.css';

interface PlayerButtonProps {
    className: string,
    children: string,
    onClick: () => void,
    title: string
}

function PlayerButton(props: PlayerButtonProps) {
    const {className, children, onClick, title} = props;
    const finalClass = 'player__button' + (className ? ` ${className}` : '');
    return <button onClick={onClick} className={finalClass} title={title}>
        {children}
    </button>
}

export default PlayerButton;
