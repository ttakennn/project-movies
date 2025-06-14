import "./MovieCard.scss";

import LazyImage from "../LazyImage/LazyImage";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import defaultImage from "../../assets/default-image.png";
import { forwardRef } from "react";
import { movieAPI } from "../../services/api";

interface MovieCardProps {
  movie: Movie;
  view: "grid" | "list";
}

const MovieCard = forwardRef<HTMLAnchorElement, MovieCardProps>(
  ({ movie, view }, ref) => {
    const { id, title, poster_path, release_date, vote_average, overview } =
      movie;

    return (
      <Link
        ref={ref}
        to={`/movie/${id}`}
        className={`movie-card movie-card--${view}`}
      >
        <div className="movie-card__poster">
          <LazyImage
            src={movieAPI.getImageUrl(poster_path) || defaultImage}
            alt={title}
          />
          <div className="movie-card__rating">{vote_average?.toFixed(1) || '--'}</div>
        </div>

        <div className="movie-card__content">
          <h3 className="movie-card__title">{title}</h3>

          {release_date && (
            <div className="movie-card__date">
              {new Date(release_date).getFullYear()}
            </div>
          )}

          {view === "list" && overview && (
            <p className="movie-card__overview">{overview}</p>
          )}
        </div>
      </Link>
    );
  }
);

export default MovieCard;
