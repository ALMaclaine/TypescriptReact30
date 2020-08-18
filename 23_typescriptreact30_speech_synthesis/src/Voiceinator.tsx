import React, {useState, useEffect, useRef, Dispatch, SetStateAction, MutableRefObject, ReactElement} from 'react';
import './Voiceinator.css';
import Voices from "./Voices";

const defaultMsg: string = 'Hello! I love JavaScript 👍';
type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Voiceinator(): ReactElement {
    const [voices, setVoices]: [SpeechSynthesisVoice[], Dispatcher<SpeechSynthesisVoice[]>] = useState<SpeechSynthesisVoice[]>([]);
    const utteranceRef: MutableRefObject<SpeechSynthesisUtterance> = useRef<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance());

    function toggle(startOver: boolean = true): void {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(utteranceRef.current);
        }
    }

    function changeVoice(voiceName: string): void {
        const voice: SpeechSynthesisVoice | undefined = voices.find((voice: SpeechSynthesisVoice) => voice.name === voiceName);
        if (voice === undefined) return;
        utteranceRef.current.voice = voice;
        toggle();
    }

    function setOption(e: React.ChangeEvent<HTMLInputElement>): void {
        switch (e.currentTarget.name) {
            case 'rate': {
                const parse = parseFloat(e.currentTarget.value);
                if (isNaN(parse)) return;
                utteranceRef.current.rate = parse;
            }
                break;
            case 'pitch': {
                const parse = parseFloat(e.currentTarget.value);
                if (isNaN(parse)) return;
                utteranceRef.current.pitch = parse;
            }
                break;
        }
        toggle();
    }

    function setMessage(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        switch (e.currentTarget.name) {
            case 'text': utteranceRef.current.text = e.currentTarget.value; break;
        }
        toggle();
    }

    useEffect((): () => void => {
        utteranceRef.current.text = defaultMsg;
        utteranceRef.current.rate = 1;
        utteranceRef.current.pitch = 1;

        function populateVoices(): void {
            setVoices(speechSynthesis.getVoices());
        }

        speechSynthesis.addEventListener('voiceschanged', populateVoices);

        return (): void => {
            speechSynthesis.removeEventListener('voiceschanged', populateVoices);
        }
    }, []);

    return <div className="voiceinator">
        <h1>The Voiceinator 5000</h1>
        <Voices changeVoice={changeVoice} voices={voices}/>

        <label htmlFor="rate">Rate:</label>
        <input onChange={setOption} name="rate" type="range" min="0" max="3" defaultValue="1" step="0.1"/>

        <label htmlFor="pitch">Pitch:</label>

        <input onChange={setOption} name="pitch" type="range" min="0" max="2" defaultValue="1" step="0.1"/>

        <textarea onChange={setMessage} name="text" defaultValue={defaultMsg}/>

        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggle(false)} id="stop">Stop!</button>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggle()} id="speak">Speak</button>
    </div>;
}

export default Voiceinator;
