import axios from 'axios';
import {
    SEARCH_ARTICLES_REQUEST,
    SEARCH_ARTICLES_SUCCESS,
    SEARCH_ARTICLES_FAILURE
} from '../types/searchTypes';
import config from '../../config';

export const searchArticles = (params = {}) => async (dispatch) => {
    dispatch({ type: SEARCH_ARTICLES_REQUEST });
    try {
        const response = await axios.get(`${config.apiBaseUrl}/api/search`, { params });
        dispatch({ type: SEARCH_ARTICLES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SEARCH_ARTICLES_FAILURE, payload: error.message });
    }
};
