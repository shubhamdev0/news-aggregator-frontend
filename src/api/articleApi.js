import axios from 'axios';

export const fetchArticles = async (query) => {
    const response = await axios.get('/api/articles', { params: query });
    return response.data;
};

export const searchArticles = async (query) => {
    const response = await axios.get('/api/search', { params: query });
    return response.data;
};
