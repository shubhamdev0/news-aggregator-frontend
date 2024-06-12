// src/components/Shimmer/Shimmer.js
import React from 'react';
import './Shimmer.scss';

const Shimmer = () => {
    const placeholders = Array.from({ length: 12 });

    return (
        <div className="shimmer-wrapper">
            {placeholders.map((_, index) => (
                <div key={index} className="shimmer-card">
                    <div className="shimmer-image" />
                    <div className="shimmer-content">
                        <div className="shimmer-title" />
                        <div className="shimmer-meta" />
                        <div className="shimmer-description" />
                        <div className="shimmer-link" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Shimmer;
