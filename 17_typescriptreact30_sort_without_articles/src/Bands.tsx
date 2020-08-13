import React, {ReactElement} from 'react';
import './Bands.css';

const strip: (bandName: string) => string = (bandName: string): string => bandName.replace(/^(a |the |an )/i, '').trim();
const sortFunction: (a: string, b: string) => number = (a: string, b: string): number => strip(a) > strip(b) ? 1 : -1
const bandElement: (band: string) => ReactElement = (band: string): ReactElement => <li key={band}>{band}</li>

interface BandsProps {
    bands: string[]
}

function Bands(props: BandsProps) {
    const {bands}: BandsProps = props;
    const sortedBands: string[] = bands.sort(sortFunction);
    return <ul className="bands">
        {sortedBands.map((e: string): ReactElement => bandElement(e))}
    </ul>;
}

export default Bands;
