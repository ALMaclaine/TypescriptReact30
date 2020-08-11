import React, {MutableRefObject, ReactElement, useEffect, useRef} from 'react';

const secretCode: string = 'wesbos';

function SecretCode(): ReactElement {
    const valRef: MutableRefObject<string[]> = useRef<string[]>([]);
    useEffect((): (() => void) => {
        const onKey = (e: KeyboardEvent): void => {
            let tmp: string[] = [...valRef.current];
            tmp.push(e.key);
            tmp.splice(-secretCode.length - 1, tmp.length - secretCode.length);
            if (tmp.join('').includes(secretCode)) {
                // @ts-ignore
                window.cornify_add();
            }
            valRef.current = tmp;
        }
        window.addEventListener('keypress', onKey);

        return (): void => {
            window.removeEventListener('keypress', onKey);
        }
    });
    return <></>;
}

export default SecretCode;
