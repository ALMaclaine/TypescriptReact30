import React, {
    forwardRef,
    ReactElement,
    useEffect,
    ForwardRefRenderFunction,
    PropsWithChildren,
    MutableRefObject
} from 'react';
import './VideoViewer.css';

async function setup(video: HTMLVideoElement): Promise<void> {
    try {
        const localMediaStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
        video.srcObject = localMediaStream;
        await video.play();
    } catch (err) {
        console.error(`OH NO!!!`, err);
    }
}

const VideoViewer: ForwardRefRenderFunction<HTMLVideoElement> = (props: PropsWithChildren<{}>, ref): ReactElement => {
    useEffect(() => {
        setup((ref as MutableRefObject<HTMLVideoElement>).current)
            .then(e => console.log('Succeeded setting up video.'))
            .catch(e => console.error('Failed setting up video.'))
    }, [ref]);
    return <video ref={ref} className="player"/>;
}

export default forwardRef<HTMLVideoElement>(VideoViewer);
