import React, {Dispatch, ReactElement, SetStateAction, SyntheticEvent, useRef, useState} from 'react';
import './Player.css';
import VideoPlayer from "./VideoPlayer";
import PlayerControls from "./PlayerControls";

type Dispatcher<E> = Dispatch<SetStateAction<E>>;
type NumberDispatcher = Dispatcher<number>;
type NumberState = [number, NumberDispatcher];

interface PlayerProps {
    videoSrc: string
}

function Player(props: PlayerProps): ReactElement {
    const { videoSrc }: PlayerProps = props;
    const [videoPlaying, setVideoPlaying]: [boolean, Dispatcher<boolean>] = useState<boolean>(false);
    const [playPercent, setPlayPercent]: NumberState = useState<number>(0);
    const [volume, setVolume]: NumberState = useState<number>(1);
    const [playbackRate, setPlaybackRate]: NumberState = useState<number>(1);
    const videoRef = useRef<any>(null);

    function togglePlay(): void {
        if (videoPlaying) {
            videoRef.current.pause()
            setVideoPlaying(false);
        } else {
            videoRef.current.play();
            setVideoPlaying(true);
        }
    }

    function onTimeUpdate(e: SyntheticEvent<HTMLVideoElement>): void {
        const percent = (e.currentTarget.currentTime / e.currentTarget.duration) * 100;
        setPlayPercent(percent);
    }

    function changeTime(value: number): void {
        videoRef.current.updateTime(value);
    }

    function setTimePercent(time: number): void {
        videoRef.current.setTimePercent(time);
    }

    function changeVolume(value: number): void {
        setVolume(value);
    }

    function changePlaybackRate(value: number): void {
        setPlaybackRate(value);
    }

    return <div className="player">
        <VideoPlayer timeUpdate={onTimeUpdate} onClick={togglePlay} ref={videoRef} volume={volume}
                     playbackRate={playbackRate} videoSrc={videoSrc}
        />
        <PlayerControls videoPlaying={videoPlaying}
                        playPercent={playPercent}
                        changeTime={changeTime}
                        setTimePercent={setTimePercent}
                        changeVolume={changeVolume}
                        changePlaybackRate={changePlaybackRate}
                        togglePlay={togglePlay}
                        volume={volume}
                        playbackRate={playbackRate}
        />
    </div>;
}

export default Player;
