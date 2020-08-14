import React, {
    forwardRef,
    ForwardRefRenderFunction,
    PropsWithChildren,
    ReactElement
} from 'react';
import './PhotoViewer.css';

interface PhotoViewerProps {
    width: number,
    height: number
}

const PhotoViewer: ForwardRefRenderFunction<HTMLCanvasElement, PhotoViewerProps> = (props: PropsWithChildren<PhotoViewerProps>, ref): ReactElement => {
    const {width, height}: PhotoViewerProps = props;
    return <canvas ref={ref} width={width} height={height} className="photo"/>
}

export default forwardRef<HTMLCanvasElement, PhotoViewerProps>(PhotoViewer);
