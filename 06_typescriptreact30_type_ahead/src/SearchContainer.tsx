import React, {useState, useEffect, ReactElement} from 'react';
import './SearchContainer.css';
import Search from "./Search";
import Suggestions from "./Suggestions";
import {Cities, City, Dispather} from "./types";

const endpoint: string = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

function findMatches(wordToMatch: string, cities: Cities): Cities {
    return cities.filter((place: City): boolean => {
        // here we need to figure out if the city or state matches what was searched
        if (wordToMatch === '') return false;
        const regex: RegExp = new RegExp(wordToMatch, 'gi');
        const cityMatch = place.city.match(regex);
        const stateMatch = place.state.match(regex);
        return (cityMatch !== null && cityMatch.length !== 0)
            || (stateMatch !== null && stateMatch.length !== 0);
    });
}

function SearchContainer(): ReactElement {
    const [results, setResults]: [Cities, Dispather<Cities>] = useState([] as Cities);
    const [data, setData]: [Cities, Dispather<Cities>] = useState([] as Cities);
    const [searchTerm, setSearchTerm]: [string, Dispather<string>] = useState("");
    useEffect((): void => {
        fetch(endpoint)
            .then((blob: Response): Promise<Cities> => blob.json())
            .then((cities: Cities): void => setData([...cities]));
    }, []);

    useEffect((): void => {
        setResults(findMatches(searchTerm, data));
    }, [searchTerm, data])

    return <div className="search-container">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Suggestions results={results}/>
    </div>;
}

export default SearchContainer;
