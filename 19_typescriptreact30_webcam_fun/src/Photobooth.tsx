import React, {useState, useRef, useEffect, ReactElement, Dispatch, SetStateAction, MutableRefObject} from 'react';
import './Photobooth.css';
import PhotoViewer from "./PhotoViewer";
import VideoViewer from "./VideoViewer";
import Controls from "./Controls";
import Strip from "./Strip";

function rgbSplit(pixels: ImageData): ImageData {
    for (let i: number = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels: ImageData, levels: Levels): ImageData {
    for (let i: number = 0; i < pixels.data.length; i = i + 4) {
        const red: number = pixels.data[i];
        const green: number = pixels.data[i + 1];
        const blue: number = pixels.data[i + 2];
        const alpha: number = pixels.data[i + 3];

        if (red >= levels.rMin
            && green >= levels.gMin
            && blue >= levels.bMin
            && red <= levels.rMax
            && green <= levels.gMax
            && blue <= levels.bMax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

function redEffect(pixels: ImageData): ImageData {
    for (let i: number = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function initializePhotoContext(video: HTMLVideoElement, photo: HTMLCanvasElement, levels: Levels): number {
    const {videoWidth: width, videoHeight: height}: {videoWidth: number, videoHeight: number} = video;
    const ctx: CanvasRenderingContext2D | null = photo.getContext('2d');
    return window.setInterval((): void => {
        if(ctx === null) return;

        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels: ImageData = ctx.getImageData(0, 0, width, height);
        // mess with them
        pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);

        pixels = greenScreen(pixels, levels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

interface Levels {
    rMin: number,
    rMax: number,
    gMin: number,
    gMax: number,
    bMin: number,
    bMax: number
}

function Photobooth(): ReactElement {
    const [photoWidth, setPhotoWidth]: [number, Dispatcher<number>] = useState<number>(0);
    const [photoHeight, setPhotoHeight]: [number, Dispatcher<number>] = useState(0);
    const [photos, setPhotos]: [string[], Dispatcher<string[]>] = useState<string[]>([]);

    const snapRef: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement | null>(null);
    const photoRef: MutableRefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement | null>(null);

    const levels: MutableRefObject<Levels> = useRef<Levels>({
        rMin: 0,
        rMax: 128,
        gMin: 0,
        gMax: 128,
        bMin: 0,
        bMax: 128
    })

    function takePhoto(): void {
        if(snapRef.current !== null && photoRef.current !== null) {
            snapRef.current.currentTime = 0;
            snapRef.current.play();
            const data: string = photoRef.current.toDataURL('image/jpeg');
            setPhotos([...photos, data]);
        }
    }

    const levelsControllers: {[key: string]: (n: number) => number} = {
        changeRMin: (n: number): number => levels.current.rMin = n,
        changeRMax: (n: number): number => levels.current.rMax = n,
        changeGMax: (n: number): number => levels.current.gMax = n,
        changeGMin: (n: number): number => levels.current.gMin = n,
        changeBMin: (n: number): number => levels.current.bMin = n,
        changeBMax: (n: number): number => levels.current.bMax = n,
    }

    useEffect((): void => {
        if(videoRef.current !== null) {
            videoRef.current.addEventListener('canplay', (): number | undefined => {
                if(videoRef.current !== null && photoRef.current !== null) {
                    setPhotoWidth(videoRef.current.videoWidth);
                    setPhotoHeight(videoRef.current.videoHeight);
                    return initializePhotoContext(videoRef.current, photoRef.current, levels.current);
                }
            });
        }
    }, [])

    return <div className="photobooth">
        <Controls {...levelsControllers} takePhoto={takePhoto}/>
        <VideoViewer ref={videoRef}/>
        <PhotoViewer ref={photoRef} width={photoWidth} height={photoHeight}/>
        <audio ref={snapRef} src={"snap.mp3"}/>
        <Strip photos={photos}/>
    </div>;
}

export default Photobooth;
