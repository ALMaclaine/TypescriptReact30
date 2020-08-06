import React, {ReactElement, useEffect} from 'react';
import './Keys.css'
import Key from "./Key";

interface KeyData {
    keyLetter: string,
    keyName: string
    soundName?: string
}

const keys: KeyData[] = [
    {
        keyLetter: 'A',
        keyName: 'Clap',
    },
    {
        keyLetter: 'S',
        keyName:'Hihat'
    },
    {
        keyLetter: 'D',
        keyName: 'Kick'
    },
    {
        keyLetter: 'F',
        keyName: 'Openhat'
    },
    {
        keyLetter: 'G',
        keyName: 'Boom'
    },
    {
        keyLetter: 'H',
        keyName: 'Ride'
    },
    {
        keyLetter: 'J',
        keyName: 'Snare'
    },
    {
        keyLetter: 'K',
        keyName: 'Tom'
    },
    {
        keyLetter: 'L',
        keyName: 'Tink'
    }
    ];

interface StringRefMap {
    [key: string]: HTMLAudioElement
}

function Keys(): ReactElement {
    const refs: StringRefMap = {};
    const setRef = (key: string, ref: HTMLAudioElement) => refs[key.toLowerCase()] = ref;

    useEffect(() => {
        const keysDown: {[key: string]: boolean} = {};
        const downHandler = (e: KeyboardEvent) => {
            keysDown[e.key] = true;
            for(const key in keysDown) {
                if(keysDown[key]) {
                    if(refs[key]) {
                        const playPromise = refs[key].play();
                        if(playPromise) {
                            playPromise.then(() => console.log('Play successful!'))
                                .catch(() => console.log('Play failed!'))
                        }
                    }
                }
            }
        }

        const upHandler = (e: KeyboardEvent) => {
            keysDown[e.key] = false;
        }

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [refs]);

    return <div className={'keys'}>
        {
            keys.map((e: KeyData) => {
                const tmp: KeyData = {...e};
                tmp.soundName = tmp.keyName.toLowerCase();
                return <Key ref={(ref: HTMLAudioElement) => setRef(tmp.keyLetter, ref)} key={tmp.keyName} {...tmp} />;
            })
        }
    </div>
}

export default Keys;
