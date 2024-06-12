// src/components/Article/Article.js
import React from 'react';
import './Article.scss';

const Article = ({ article }) => {
    console.log("article", article);
    return (
        <div className="article">
            <div className="article__image-container">
                <img src={article.imageUrl} alt={article.title} className="article__image" />
            </div>
            <div className="article__content">
                <span className="article__category">{article.category}</span>
                <h2 className="article__title">{article.title}</h2>
                <p className="article__description">{article.description}</p>
                <p className="article__meta">
                    <span className="article__date">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span className="article__source">{article.source}</span>
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="article__link">
                    Read more
                </a>
            </div>
        </div>
    );
};

export default Article;
