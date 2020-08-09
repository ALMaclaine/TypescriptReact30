import React, {SyntheticEvent} from 'react';
import './Search.css';

interface SearchProps {
    searchTerm: string,
    setSearchTerm: (e: string) => void
}

function Search(props: SearchProps) {
    const {searchTerm, setSearchTerm}: SearchProps = props;
    const handler = (e: SyntheticEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value);
    return <input type="text" value={searchTerm} onKeyUp={handler} onChange={handler} className="search"
                  placeholder="City or State"/>;
}

export default Search;
