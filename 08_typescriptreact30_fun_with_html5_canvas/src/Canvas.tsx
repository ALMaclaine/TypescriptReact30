import React, {
    useState,
    useEffect,
    useRef,
    Dispatch,
    SetStateAction,
    MutableRefObject,
    ReactElement
} from 'react'

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

interface DrawState {
    isDrawing: boolean,
    lastX: number,
    lastY: number,
    hue: number,
    direction: boolean
}

function Canvas(): ReactElement {
    const [width, setWidth]: [number, Dispatcher<number>] = useState<number>(window.innerWidth);
    const [height, setHeight]: [number, Dispatcher<number>] = useState<number>(window.innerHeight);
    const [ctx, setCtx]: [CanvasRenderingContext2D | null, Dispatcher<CanvasRenderingContext2D | null>] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement | null>(null);
    const canvasValuesRef: MutableRefObject<DrawState> = useRef<DrawState>({
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        hue: 0,
        direction: true
    });

    useEffect((): void => {
        if (canvasRef.current !== null) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, []);

    useEffect((): void => {
        if (!ctx) return;
        ctx.strokeStyle = '#BADA55';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 100;
    }, [ctx])

    useEffect((): (() => void) => {
        const handler = (): void => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize', handler);

        return (): void => {
            window.removeEventListener('resize', handler);
        }
    }, []);

    useEffect((): (() => void) | void => {
        const {current}: { current: HTMLCanvasElement | null } = canvasRef;

        function draw(ref: MutableRefObject<DrawState>, e: MouseEvent): void {
            const {current}: { current: DrawState } = ref;
            const {isDrawing, lastX, lastY, hue}: DrawState = current;
            if (!isDrawing || !ctx) return; // stop the fn from running when they are not moused down
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.beginPath();
            // start from
            ctx.moveTo(lastX, lastY);
            // go to
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [current.lastX, current.lastY] = [e.offsetX, e.offsetY];

            current.hue++;
            if (current.hue >= 360) {
                current.hue = 0;
            }

            if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
                current.direction = !current.direction;
            }

            if (current.direction) {
                ctx.lineWidth++;
            } else {
                ctx.lineWidth--;
            }
        }

        if (current !== null) {
            const mouseDownHandler = (e: MouseEvent): void => {
                canvasValuesRef.current.isDrawing = true;
                [canvasValuesRef.current.lastX, canvasValuesRef.current.lastY] = [e.offsetX, e.offsetY];
            }
            current.addEventListener('mousedown', mouseDownHandler);


            const drawHandler = (e: MouseEvent): void => draw(canvasValuesRef, e);
            current.addEventListener('mousemove', drawHandler);

            const drawingFalse = (): boolean => canvasValuesRef.current.isDrawing = false;

            current.addEventListener('mouseup', drawingFalse);
            current.addEventListener('mouseout', drawingFalse);

            return (): void => {
                current.removeEventListener('mousedown', mouseDownHandler);
                current.removeEventListener('mousemove', drawHandler);
                current.removeEventListener('mouseup', drawingFalse);
                current.removeEventListener('mouseout', drawingFalse);
            }
        }
    }, [ctx]);

    return <canvas ref={canvasRef} id="draw" width={width} height={height}/>;
}

export default Canvas;
