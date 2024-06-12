import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, searchArticles as searchForArticles } from '../../redux/actions/articleActions';
import Article from '../Article/Article';
import Shimmer from '../Shimmer/Shimmer';
import './ArticleList.scss';

const ArticleList = ({ filters }) => {
    const dispatch = useDispatch();
    const { articles: allArticles = [], loading: allLoading, error: allError } = useSelector((state) => state.articles);
    const { articles: searchedArticles = [], loading: searchLoading, error: searchError } = useSelector((state) => state.search);
    const { preferences } = useSelector((state) => state.user.preferences);

    useEffect(() => {
        if (preferences && (preferences.sources?.length || preferences.categories?.length || preferences.authors?.length)) {
            dispatch(searchForArticles(preferences));
        } else {
            dispatch(fetchArticles());
        }
    }, [dispatch, preferences]);

    useEffect(() => {
        if (filters.date || filters.category || filters.source) {
            dispatch(searchForArticles(filters));
        } else {
            dispatch(fetchArticles());
        }
    }, [dispatch, filters]);

    const articles = searchedArticles.length > 0 ? searchedArticles : allArticles;
    const loading = searchLoading || allLoading;
    const error = searchError || allError;

    if (loading) return <Shimmer />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="articleList">
            {articles.map((article) => (
                article.imageUrl && <Article key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
