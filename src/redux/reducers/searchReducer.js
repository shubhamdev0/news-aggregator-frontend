// src/redux/reducers/searchReducer.js
import {
    SEARCH_ARTICLES_REQUEST,
    SEARCH_ARTICLES_SUCCESS,
    SEARCH_ARTICLES_FAILURE
} from '../types/searchTypes';

const initialState = {
    articles: [],
    loading: false,
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ARTICLES_REQUEST:
            return { ...state, loading: true };
        case SEARCH_ARTICLES_SUCCESS:
            return { ...state, loading: false, articles: action.payload };
        case SEARCH_ARTICLES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
