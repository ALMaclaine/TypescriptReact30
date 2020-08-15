import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import './Words.css';

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function Words(): ReactElement {
    const [words, setWords]: [string[], Dispatcher<string[]>] = useState<string[]>([]);
    useEffect((): () => void => {
        // @ts-ignore
        const SpeechRecognition: { new(): SpeechRecognition } = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition: SpeechRecognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        const resultHandler = (e: SpeechRecognitionEvent): void => {
            if (e.results[0].isFinal) {
                const transcript: string = Array.from(e.results)
                    .map((result: SpeechRecognitionResult): SpeechRecognitionAlternative => result[0])
                    .map((result: SpeechRecognitionAlternative): string => result.transcript)
                    .join('');

                const poopScript: string = transcript.replace(/poop|poo|shit|dump/gi, '💩');

                setWords([...words, poopScript]);
            }
        }
        recognition.addEventListener('result', resultHandler);
        recognition.addEventListener('end', recognition.start);
        recognition.start();

        return (): void => {
            recognition.removeEventListener('result', resultHandler);
            recognition.removeEventListener('end', recognition.start);
        }
    }, [words]);
    return <div className="words" contentEditable={true} suppressContentEditableWarning={true}>
        {
            words.map((e: string) => <p key={e}>{e}</p>)
        }
    </div>
}

export default Words;
