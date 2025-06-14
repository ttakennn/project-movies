import "./MovieDetail.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LazyImage from "../LazyImage/LazyImage";
import Loading from "../Loading/Loading";
import type { MovieDetail as MovieDetailType } from "../../types/movie";
import defaultImage from "../../assets/default-image.png";
import { movieAPI } from "../../services/api";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await movieAPI.getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch movie details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="movie-detail">
        <button className="movie-detail__back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="movie-detail__error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail">
        <button className="movie-detail__back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="movie-detail__error">
          <p>Movie not found</p>
        </div>
      </div>
    );
  }

  const director = movie.credits?.crew.find(
    (member) => member.job === "Director"
  );
  const cast = movie.credits?.cast.slice(0, 5) || [];

  return (
    <div className="movie-detail">
      <button className="movie-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-detail__content">
        <div className="movie-detail__poster">
          <div className="movie-detail__poster-wrapper">
            <LazyImage
              src={
                movieAPI.getImageUrl(movie.poster_path, "original") ||
                defaultImage
              }
              alt={movie.title}
            />
          </div>
        </div>

        <div className="movie-detail__info">
          <h1 className="movie-detail__title">{movie.title}</h1>

          {movie.tagline && (
            <p className="movie-detail__tagline">{movie.tagline}</p>
          )}

          <div className="movie-detail__meta">
            <span className="movie-detail__rating">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            {movie.runtime > 0 && (
              <span className="movie-detail__duration">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            )}
            <span className="movie-detail__date">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          <div className="movie-detail__genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="movie-detail__genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="movie-detail__section">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          {director && (
            <div className="movie-detail__section">
              <h3>Director</h3>
              <p>{director.name}</p>
            </div>
          )}

          {cast.length > 0 && (
            <div className="movie-detail__section">
              <h3>Cast</h3>
              <div className="movie-detail__cast">
                {cast.map((actor) => (
                  <span key={actor.id} className="movie-detail__cast-member">
                    {actor.name} as {actor.character}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
