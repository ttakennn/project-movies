import "./SearchResults.scss";

import { useCallback, useRef } from "react";

import MovieCard from "../components/MovieCard/MovieCard";
import SearchResultsSkeleton from "../components/Skeleton/SearchResultsSkeleton";
import { useSearch } from "../hooks/useSearch";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { movies, loading, error, hasMore, loadMore } = useSearch(query);

  // Intersection Observer for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) {
    return <div className="search-results__error">{error}</div>;
  }

  if (movies.length === 0 && loading) {
    return <SearchResultsSkeleton />;
  }

  return (
    <div className="search-results">
      <header className="search-results__header">
        <h2 className="search-results__title">Search Results for: "{query}"</h2>
        <div className="search-results__count">
          {movies.length} movies found
        </div>
      </header>

      <div className="search-results__list">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            ref={index === movies.length - 1 ? lastMovieElementRef : undefined}
          >
            <MovieCard movie={movie} view="list" />
          </div>
        ))}
        {loading && hasMore && <SearchResultsSkeleton />}
      </div>
    </div>
  );
};

export default SearchResults;
