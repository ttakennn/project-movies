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
      <div className="view-toggle">
        <button
          className={`view-toggle__btn ${
            viewType === "grid" ? "view-toggle__btn--active" : ""
          }`}
          onClick={() => setViewType("grid")}
        >
          Grid View
        </button>
        <button
          className={`view-toggle__btn ${
            viewType === "list" ? "view-toggle__btn--active" : ""
          }`}
          onClick={() => setViewType("list")}
        >
          List View
        </button>
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
