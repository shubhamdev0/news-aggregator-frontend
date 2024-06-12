// src/redux/reducers/userReducer.js
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    SET_USER_PREFERENCES
} from '../types/userTypes';
import {combineReducers} from "redux";

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case USER_LOGOUT:
            return { ...state, userInfo: null };
        default:
            return state;
    }
};

const initialUserPreferencesState = {
    preferences: {}
};

export const userPreferencesReducer = (state = initialUserPreferencesState, action) => {
    switch (action.type) {
        case SET_USER_PREFERENCES:
            return { ...state, preferences: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    login: userLoginReducer,
    preferences: userPreferencesReducer,
});
