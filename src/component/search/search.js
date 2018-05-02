import React from 'react';
import "./search.css";

const Search = props => {
    const { searchIt } = props;
    let searchElement = '';
    return (
        <form onSubmit={e => searchIt(e, searchElement)}>
            <input 
                type="search"
                ref={element => searchElement = element}/>
            <button type="submit">Search it</button>
        </form>
    )
}
export default Search