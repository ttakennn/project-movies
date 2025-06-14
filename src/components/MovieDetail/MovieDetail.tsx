import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.scss';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - replace with actual API call later
  const movieDetails = {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
    image: 'https://via.placeholder.com/500x750',
    rating: 9.3,
    duration: '2h 22min',
    genre: ['Drama', 'Crime'],
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    overview: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
  };

  return (
    <div className="movie-detail">
      <button 
        className="movie-detail__back" 
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="movie-detail__content">
        <div className="movie-detail__poster">
          <img src={movieDetails.image} alt={movieDetails.title} />
        </div>

        <div className="movie-detail__info">
          <h1 className="movie-detail__title">{movieDetails.title}</h1>
          
          <div className="movie-detail__meta">
            <span className="movie-detail__rating">★ {movieDetails.rating}</span>
            <span className="movie-detail__duration">{movieDetails.duration}</span>
            <span className="movie-detail__date">{movieDetails.releaseDate}</span>
          </div>

          <div className="movie-detail__genres">
            {movieDetails.genre.map(genre => (
              <span key={genre} className="movie-detail__genre-tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="movie-detail__section">
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>

          <div className="movie-detail__section">
            <h3>Director</h3>
            <p>{movieDetails.director}</p>
          </div>

          <div className="movie-detail__section">
            <h3>Cast</h3>
            <div className="movie-detail__cast">
              {movieDetails.cast.map(actor => (
                <span key={actor} className="movie-detail__cast-member">
                  {actor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 