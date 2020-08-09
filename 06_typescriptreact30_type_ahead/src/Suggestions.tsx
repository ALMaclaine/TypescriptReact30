import React, {ReactElement} from 'react';
import './Suggestions.css';
import {Cities, City} from "./types";

function numberWithCommas(x: string): string {
    return x.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function DummySuggestion(): ReactElement {
    return <>
        <li>Filter for a city</li>
        <li>or a state</li>
    </>;
}

interface SuggestionProps {
    place: City
}

function Suggestion(props: SuggestionProps): ReactElement {
    const {place}: SuggestionProps = props;
    const cityName: ReactElement = <span className="hl">{place.city}</span>
    const stateName: ReactElement = <span className="hl">{place.state}</span>
    return <>
        {cityName}, {stateName}
    </>;
}

function SuggestionHolder(props: SuggestionProps): ReactElement {
    const {place}: SuggestionProps = props;
    return <li>
        <span className="name"><Suggestion place={place}/></span>
        <span className="population">{numberWithCommas(place.population)}</span>
    </li>;
}

interface SuggestionsProps {
    results: Cities
}

function Suggestions(props: SuggestionsProps): ReactElement {
    const {results}: SuggestionsProps = props;
    let elem: ReactElement | ReactElement[];
    if (results.length === 0) {
        elem = <DummySuggestion/>
    } else {
        elem = results.map(e => <SuggestionHolder key={`${e.city}${e.state}`} place={e}/>);
    }
    return <ul className="suggestions">
        {elem}
    </ul>
}

export default Suggestions;
