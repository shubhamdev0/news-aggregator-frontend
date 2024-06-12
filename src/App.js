import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import { fetchArticles, searchArticles } from './redux/actions/articleActions';
import { fetchUserPreferences } from './redux/actions/userActions'; // Import fetchUserPreferences
import './App.scss';

const Search = lazy(() => import('./components/Search/Search'));
const Filter = lazy(() => import('./components/Filter/Filter'));
const ArticleList = lazy(() => import('./components/ArticleList/ArticleList'));
const UserPreferences = lazy(() => import('./components/UserPreferences/UserPreferences'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const UserDetails = lazy(() => import('./components/UserDetails/UserDetails'));

const App = () => {
    const userLogin = useSelector((state) => state.user.login);
    const { userInfo } = userLogin || {};
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        date: '',
        category: '',
        source: ''
    });

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchUserPreferences(userInfo._id)).then((preferences) => {
                setFilters(preferences || { date: '', category: '', source: '' });
                dispatch(searchArticles(preferences || {}));
            });
        } else {
            dispatch(fetchArticles());
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        const { date, category, source } = filters || {};
        if (date || category || source) {
            dispatch(searchArticles(filters));
        }
    }, [dispatch, filters]);

    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="app__main">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
                            <Route path="/signup" element={userInfo ? <Navigate to="/" /> : <Signup />} />
                            <Route path="/" element={
                                <div>
                                    <Search />
                                    <Filter filters={filters} setFilters={setFilters} />
                                    <ArticleList filters={filters} />
                                </div>
                            } />
                            <Route path="/user-details" element={
                                <PrivateRoute>
                                    <UserDetails />
                                </PrivateRoute>
                            } />
                            <Route path="/user-preferences" element={
                                <PrivateRoute>
                                    <UserPreferences />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
