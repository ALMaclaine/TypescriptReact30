import React, {forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement} from 'react';
import './SlideImage.css';

export interface SlideImageProps {
    slideType?: string,
    src: string,
    active: boolean
}

const SlideImage: ForwardRefRenderFunction<HTMLImageElement, SlideImageProps> = (props: PropsWithChildren<SlideImageProps>, ref): ReactElement => {
    const {slideType, src, active}: SlideImageProps = props;
    const classes = 'slide-in' + (slideType ? ` ${slideType}` : '')
        + (active ? ' active' : '');
    return <img ref={ref} alt={"Random filler"} src={src} className={classes}/>;
}

export default forwardRef<HTMLImageElement, SlideImageProps>(SlideImage);
