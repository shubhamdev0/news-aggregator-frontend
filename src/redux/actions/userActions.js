import axios from 'axios';
import {
    SET_USER_PREFERENCES,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
} from '../types/userTypes';
import config from '../../config';
import { searchArticles } from './searchActions';

export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/auth/login`, credentials);
        const userInfo = response.data;

        // Store user info in local storage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const registerUser = (userInfo) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/auth/register`, userInfo);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
        return true; // Return success for navigation
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
        return false; // Return failure for error handling
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const fetchUserPreferences = (userId) => async (dispatch, getState) => {
    try {
        const { user: { login: { userInfo } } } = getState();

        if (!userInfo) {
            throw new Error("User not logged in");
        }

        const headerConfig = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await axios.get(`${config.apiBaseUrl}/api/users/${userId}/preferences`, headerConfig);
        dispatch({ type: SET_USER_PREFERENCES, payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching user preferences:', error);
    }
};


export const setUserPreferences = (preferences) => async (dispatch, getState) => {
    try {
        const { user: { login: { userInfo } } } = getState();

        if (!userInfo) {
            throw new Error("User not logged in");
        }

        const headerConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await axios.put(`${config.apiBaseUrl}/api/users/${userInfo._id}/preferences`, preferences, headerConfig);

        dispatch({ type: SET_USER_PREFERENCES, payload: response.data });

        dispatch(searchArticles(preferences));
    } catch (error) {
        console.error('Error updating user preferences:', error);
    }
};
