import React, {
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
    MutableRefObject,
    ForwardRefRenderFunction,
    ReactElement,
    PropsWithChildren, Dispatch, SetStateAction
} from 'react';

import KeyIcon from "./KeyIcon";
import {KeyData} from "./IKeyData";

export interface KeyHandles {
    play(): void;
}

type Dispatcher<E> = Dispatch<SetStateAction<E>>

const Key: ForwardRefRenderFunction<KeyHandles, KeyData> = (props: PropsWithChildren<KeyData>, ref): ReactElement => {
    const {keyLetter, keyName, soundName}: KeyData = props;
    const [inProp, setInProp]: [boolean, Dispatcher<boolean>] = useState<boolean>(false);
    const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement>(null);

    const click: (() => void) = () => {
        setInProp(true);
        if (audioRef.current !== null) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }

    useImperativeHandle(ref, (): KeyHandles => ({
        play: click
    }));

    return <div onClick={click}>
        <KeyIcon playing={inProp} keyLetter={keyLetter} keyName={keyName} onEntered={() => setInProp(false)}/>
        <audio id='test' ref={audioRef} src={`sounds/${soundName}.wav`}/>
    </div>
}

export default forwardRef<KeyHandles, KeyData>(Key);
