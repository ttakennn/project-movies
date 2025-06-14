import "./MovieList.scss";

import { useCallback, useRef, useState } from "react";

import Loading from "../Loading/Loading";
import MovieCard from "../MovieCard/MovieCard";
import { useMovies } from "../../hooks/useMovies";

type MovieCategory = "now_playing" | "top_rated";

interface MovieListProps {
  category: MovieCategory;
}

const MovieList = ({ category }: MovieListProps) => {
  const { movies, loading, error, hasMore, loadMore } = useMovies(category);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMore]
  );

  if (error) {
    return (
      <div className="movie-container">
        <div className="movie-error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      <div className="movie-container__header">
        <div className="movie-container__title">
          {category === "now_playing" ? "Now Playing" : "Top Rated"} Movies
        </div>
        <div className="view-toggle">
          <button
            className={`view-toggle__btn ${
              viewType === "grid" ? "view-toggle__btn--active" : ""
            }`}
            onClick={() => setViewType("grid")}
            title="Grid View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            className={`view-toggle__btn ${
              viewType === "list" ? "view-toggle__btn--active" : ""
            }`}
            onClick={() => setViewType("list")}
            title="List View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="movie-list-wrapper">
          <div
            className={`movie-list ${
              viewType === "list" ? "movie-list--list" : ""
            }`}
          >
            {movies.map((movie, index) => (
              <MovieCard
                ref={index === movies.length - 1 ? lastMovieElementRef : null}
                key={movie.id}
                movie={movie}
                view={viewType}
              />
            ))}
          </div>

          {loading && <Loading />}
        </div>
    </div>
  );
};

export default MovieList;
