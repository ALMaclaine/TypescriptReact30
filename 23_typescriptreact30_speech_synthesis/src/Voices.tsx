import React, {ReactElement} from 'react';

interface VoicesProps {
    voices: SpeechSynthesisVoice[],
    changeVoice: (voice: string) => void
}

function Voices(props: VoicesProps) {
    const {voices, changeVoice}: VoicesProps = props;
    let elem: ReactElement | ReactElement[];
    if (voices && voices.length !== 0) {
        elem = [];
        for (const voice of voices) {
            if (!voice.lang.includes('en')) continue;
            elem.push(<option key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</option>);
        }
    } else {
        elem = <option value="">Select A Voice</option>
    }
    return <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeVoice(e.currentTarget.value)}
                   name="voice" id="voices">
        {elem}
    </select>;
}

export default Voices;
