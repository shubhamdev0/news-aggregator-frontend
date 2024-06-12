import axios from 'axios';

export const getUserPreferences = async (userId) => {
    const response = await axios.get(`/api/users/${userId}/preferences`);
    return response.data;
};

export const setUserPreferences = async (userId, preferences) => {
    const response = await axios.post(`/api/users/${userId}/preferences`, preferences);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
};

export const registerUser = async (userInfo) => {
    const response = await axios.post('/api/auth/register', userInfo);
    return response.data;
};
