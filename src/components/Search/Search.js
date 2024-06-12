import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchArticles } from '../../redux/actions/articleActions';
import './Search.scss';
import { debounce } from 'lodash';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();

    // const debouncedSearch = useCallback(debounce((keyword) => {
    //     dispatch(searchArticles({ keyword }));
    // }, 300), [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchArticles({ keyword }));
    };

    return (
        <form className="search" onSubmit={handleSearch}>
            <input
                type="text"
                className="search__input"
                placeholder="Search for articles..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="search__button">Search</button>
        </form>
    );
};

export default Search;
