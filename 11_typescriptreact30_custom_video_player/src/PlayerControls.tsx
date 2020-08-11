import React, {ReactElement} from 'react';
import './PlayerControls.css';
import ProgressBar from "./ProgressBar";
import PlayerButton from "./PlayerButton";
import PlayerSlider from "./PlayerSlider";

interface PlayerControlsProps {
    videoPlaying: boolean,
    playPercent: number,
    changeTime: (e: number) => void,
    togglePlay: () => void,
    changePlaybackRate: (e: number) => void,
    changeVolume: (e: number) => void,
    volume: number,
    playbackRate: number,
    setTimePercent: (e: number) => void
}

function PlayerControls(props: PlayerControlsProps): ReactElement {
    const {videoPlaying, playPercent, changeTime, togglePlay, changePlaybackRate, changeVolume, volume, playbackRate, setTimePercent}: PlayerControlsProps = props;
    return <div className="player__controls">
        <ProgressBar setTimePercent={setTimePercent} playPercent={playPercent}/>
        <PlayerButton onClick={togglePlay} className="toggle" title="Toggle Play">
            {!videoPlaying ? '►' : '❚ ❚'}
        </PlayerButton>
        <PlayerSlider update={changeVolume} value={volume} name="volume" min={0} max={1} step={0.05}/>
        <PlayerSlider update={changePlaybackRate} value={playbackRate} name="playbackRate" min={0.5} max={2}
                      step={0.1}/>
        <PlayerButton onClick={() => changeTime(-10)} className="player__button" title="Skip Back">« 10s</PlayerButton>
        <PlayerButton onClick={() => changeTime(25)} className="player__button" title="Skip Forward">25s »</PlayerButton>
    </div>;
}

export default PlayerControls;
