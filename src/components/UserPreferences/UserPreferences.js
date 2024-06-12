import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPreferences } from '../../redux/actions/userActions';
import axios from 'axios';
import config from '../../config';
import './UserPreferences.scss';

const UserPreferences = () => {
    const dispatch = useDispatch();
    const { preferences } = useSelector((state) => state.user.preferences);
    const [availableOptions, setAvailableOptions] = useState({
        sources: [],
        categories: [],
        authors: []
    });
    const [newPreferences, setNewPreferences] = useState({
        sources: [],
        categories: [],
        authors: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/api/options`);
                const { sources, categories, authors } = response.data;
                setAvailableOptions({ sources, categories, authors });
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (preferences) {
            setNewPreferences({
                sources: preferences.sources || [],
                categories: preferences.categories || [],
                authors: preferences.authors || []
            });
        }
    }, [preferences]);

    const handleChange = (e) => {
        const { name, selectedOptions } = e.target;
        const values = Array.from(selectedOptions, option => option.value);
        setNewPreferences({ ...newPreferences, [name]: values });
        dispatch(setUserPreferences({ ...newPreferences, [name]: values }));
    };

    const handleSave = () => {
        dispatch(setUserPreferences(newPreferences));
    };

    return (
        <div className="user-preferences">
            <h2>Your Preferences</h2>
            <div className="user-preferences__inputs">
                <select
                    name="sources"
                    className="user-preferences__input"
                    value={newPreferences.sources}
                    onChange={handleChange}
                >
                    {availableOptions.sources.map((source) => (
                        <option key={source} value={source}>{source}</option>
                    ))}
                </select>
                <select
                    name="categories"
                    className="user-preferences__input"
                    value={newPreferences.categories}
                    onChange={handleChange}
                >
                    {availableOptions.categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    name="authors"
                    className="user-preferences__input"
                    value={newPreferences.authors}
                    onChange={handleChange}
                >
                    {availableOptions.authors.map((author) => (
                        <option key={author} value={author}>{author}</option>
                    ))}
                </select>
                <button className="user-preferences__button" onClick={handleSave}>
                    Save Preferences
                </button>
            </div>
            <div className="user-preferences__display">
                <h3>Current Preferences:</h3>
                <p><strong>Sources:</strong> {newPreferences.sources.join(', ')}</p>
                <p><strong>Categories:</strong> {newPreferences.categories.join(', ')}</p>
                <p><strong>Authors:</strong> {newPreferences.authors.join(', ')}</p>
            </div>
        </div>
    );
};

export default UserPreferences;
