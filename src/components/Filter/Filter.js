import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import config from '../../config';
import './Filter.scss';
import { debounce } from 'lodash';

const Filter = ({ filters, setFilters }) => {
    const [availableOptions, setAvailableOptions] = useState({
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

    const debouncedSetFilters = useCallback(debounce((filters) => {
        setFilters(filters);
    }, 300), [setFilters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        debouncedSetFilters({ ...filters, [name]: value });
    };

    return (
        <div className="filter">
            <input
                type="date"
                name="date"
                className="filter__input"
                value={filters.date}
                onChange={handleChange}
            />
            <select
                name="category"
                className="filter__input"
                value={filters.category}
                onChange={handleChange}
            >
                <option value="">Select Category</option>
                {availableOptions.categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select
                name="source"
                className="filter__input"
                value={filters.source}
                onChange={handleChange}
            >
                <option value="">Select Source</option>
                {availableOptions.sources.map((source) => (
                    <option key={source} value={source}>{source}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
