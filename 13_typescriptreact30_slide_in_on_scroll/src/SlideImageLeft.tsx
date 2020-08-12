import React, {forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement} from 'react';
import './SlideImageLeft.css';
import SlideImage, {SlideImageProps} from "./SlideImage";

const SlideImageLeft: ForwardRefRenderFunction<HTMLImageElement, SlideImageProps> = (props: PropsWithChildren<SlideImageProps>, ref): ReactElement => {
    const {src, active}: SlideImageProps = props;
    return <SlideImage ref={ref} slideType='align-left' active={active} src={src}/>
}

export default forwardRef(SlideImageLeft);
