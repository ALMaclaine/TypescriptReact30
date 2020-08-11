import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect,
    MutableRefObject,
    SyntheticEvent,
    ForwardRefRenderFunction, PropsWithChildren, ReactElement
} from 'react';
import './Player.css';

interface VideoPlayerHandles {
    play: () => void,
    pause: () => void,
    updateTime: (time: number) => void,
    changeVolume: (vol: number) => void,
    changePlaybackRate: (rate: number) => void,
    setTimePercent: (percent: number) => void
}

interface VideoPlayerProps {
    videoSrc: string,
    onClick: () => void,
    timeUpdate: (e: SyntheticEvent<HTMLVideoElement>) => void,
    volume: number,
    playbackRate: number
}

const VideoPlayer: ForwardRefRenderFunction<VideoPlayerHandles, VideoPlayerProps> = (props: PropsWithChildren<VideoPlayerProps>, ref): ReactElement => {
    const {videoSrc, onClick, timeUpdate, volume, playbackRate}: VideoPlayerProps = props;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement | null>(null);
    const play = (): Promise<void> | null => videoRef.current && videoRef.current.play();
    const pause = (): void | null => videoRef.current && videoRef.current.pause();
    const updateTime = (time: number): number | null => videoRef.current && (videoRef.current.currentTime += time);
    const changeVolume = (vol: number): number | null => videoRef.current && (videoRef.current.volume = vol);
    const changePlaybackRate = (rate: number): number | null => videoRef.current && (videoRef.current.playbackRate = rate);
    const setTimePercent = (percent: number): number | null => videoRef.current && (videoRef.current.currentTime = percent * videoRef.current.duration);

    useImperativeHandle<VideoPlayerHandles, VideoPlayerHandles>(ref, (): VideoPlayerHandles => ({
        play,
        pause,
        updateTime,
        changeVolume,
        changePlaybackRate,
        setTimePercent
    }));

    useEffect((): void => {
        changeVolume(volume);
        changePlaybackRate(playbackRate);
    }, [volume, playbackRate]);

    return <video onTimeUpdate={timeUpdate} onClick={onClick} ref={videoRef} className="player__video" src={videoSrc}/>;
}

export default forwardRef<VideoPlayerHandles, VideoPlayerProps>(VideoPlayer);
