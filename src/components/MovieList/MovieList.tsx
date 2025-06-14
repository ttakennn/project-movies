import './MovieList.scss';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const dummyMovies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
    image: 'https://via.placeholder.com/300x450'
  },
  {
    id: 2,
    title: 'The Godfather',
    releaseDate: '1972-03-24',
    image: 'https://via.placeholder.com/300x450'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    releaseDate: '2008-07-18',
    image: 'https://via.placeholder.com/300x450'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    releaseDate: '1994-10-14',
    image: 'https://via.placeholder.com/300x450'
  }
];

const MovieList = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  return (
    <div className="movie-container">
      <div className="view-toggle">
        <button 
          className={`view-toggle__btn ${viewType === 'grid' ? 'view-toggle__btn--active' : ''}`}
          onClick={() => setViewType('grid')}
        >
          Grid View
        </button>
        <button 
          className={`view-toggle__btn ${viewType === 'list' ? 'view-toggle__btn--active' : ''}`}
          onClick={() => setViewType('list')}
        >
          List View
        </button>
      </div>
      
      <div className={`movie-list ${viewType === 'list' ? 'movie-list--list' : ''}`}>
        {dummyMovies.map(movie => (
          <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id} 
            className="movie-card"
          >
            <img src={movie.image} alt={movie.title} className="movie-card__image" />
            <div className="movie-card__content">
              <h3 className="movie-card__title">{movie.title}</h3>
              <p className="movie-card__date">{movie.releaseDate}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList; 