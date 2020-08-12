import React, {forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement} from 'react';
import './SlideImageRight.css';
import SlideImage, {SlideImageProps} from "./SlideImage";

const SlideImageRight: ForwardRefRenderFunction<HTMLImageElement, SlideImageProps> = (props: PropsWithChildren<SlideImageProps>, ref): ReactElement => {
    const {src, active}: SlideImageProps = props;
    return <SlideImage ref={ref} slideType='align-right' active={active} src={src}/>
}

export default forwardRef(SlideImageRight);
