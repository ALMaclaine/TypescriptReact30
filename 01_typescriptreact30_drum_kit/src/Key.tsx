import React, {
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
    MutableRefObject,
    ForwardRefRenderFunction,
    ReactElement,
    PropsWithChildren
} from 'react';

import KeyIcon from "./KeyIcon";
import {KeyData} from "./IKeyData";

export interface KeyHandles {
    play(): void;
}

const Key: ForwardRefRenderFunction<KeyHandles, KeyData> = (props: PropsWithChildren<KeyData>, ref): ReactElement => {
    const {keyLetter, keyName, soundName} = props;
    const [inProp, setInProp] = useState(false);
    const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement>(null);

    const click: (() => void) = () => {
        setInProp(true);
        if (audioRef.current !== null) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }

    useImperativeHandle(ref, () => ({
        play: click
    }));

    return <div onClick={click}>
        <KeyIcon playing={inProp} keyLetter={keyLetter} keyName={keyName} onEntered={() => setInProp(false)}/>
        <audio id='test' ref={audioRef} src={`sounds/${soundName}.wav`}/>
    </div>
}

// function Key(props: KeyData & { children?: ReactNode }, ref: ((instance: (KeyHandles | null)) => void) | MutableRefObject<KeyHandles | null> | null): ReactElement {
//     const {keyLetter, keyName, soundName} = props;
//     const [inProp, setInProp] = useState(false);
//     const audioRef: MutableRefObject<HTMLAudioElement | undefined> = useRef();
//
//     const click: (() => void) = () => {
//         setInProp(true);
//         if (audioRef.current !== undefined) {
//             audioRef.current.currentTime = 0;
//             audioRef.current.play();
//         }
//     }
//
//     useImperativeHandle(impRef, () => ({
//         play: click
//     }));
//
//     return <div onClick={click}>
//         <KeyIcon playing={inProp} keyLetter={keyLetter} keyName={keyName} onEntered={() => setInProp(false)}/>
//         <audio id='test' ref={audioRef} src={`sounds/${soundName}.wav`}/>
//     </div>
// }

//
// function Key2(props: KeyData, impRef: MutableRefObject<HTMLAudioElement>) {
//     const { keyLetter, keyName, soundName } = props;
//     const [inProp, setInProp] = useState(false);
//     const audioRef: MutableRefObject<HTMLAudioElement | undefined> = useRef();
//
//     const click: (() => void) = () => {
//         setInProp(true);
//         if(audioRef.current !== undefined) {
//             audioRef.current.currentTime = 0;
//             audioRef.current.play();
//         }
//     }
//
//     useImperativeHandle(impRef, () => ({
//         play: click
//     }));
//
//     return <div onClick={click}>
//         <KeyIcon playing={inProp} keyLetter={keyLetter} keyName={keyName} onEntered={() => setInProp(false)} />
//         <audio id='test' ref={audioRef} src={`sounds/${soundName}.wav`} />
//     </div>
// }

export default forwardRef<KeyHandles, KeyData>(Key);
