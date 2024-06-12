import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    SEARCH_ARTICLES_REQUEST,
    SEARCH_ARTICLES_SUCCESS,
    SEARCH_ARTICLES_FAILURE,
} from '../types/articleTypes';
import config from '../../config';

export const fetchArticles = () => async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });
    try {
        const response = await axios.get(`${config.apiBaseUrl}/api/articles`);
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const searchArticles = (filters) => async (dispatch) => {
    dispatch({ type: SEARCH_ARTICLES_REQUEST });
    try {
        const params = {
            date: filters.date || '',
            category: filters.category || '',
            source: filters.source || '',
            keyword: filters.keyword || '',
        };
        const response = await axios.get(`${config.apiBaseUrl}/api/search`, { params });
        dispatch({ type: SEARCH_ARTICLES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SEARCH_ARTICLES_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
