import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import userReducers from './userReducer';
import searchReducer from "./searchReducer";

export default combineReducers({
    articles: articleReducer,
    user: userReducers, // This combines login and preferences
    search: searchReducer,
});
