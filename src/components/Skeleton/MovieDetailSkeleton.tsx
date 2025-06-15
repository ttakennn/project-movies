import './Skeleton.scss';

export const MovieDetailSkeleton = () => {
  return (
    <div className="movie-detail__content">
      <div className="movie-detail__poster">
        <div className="movie-detail__poster-wrapper">
          <div className="skeleton-poster animate-pulse"></div>
        </div>
      </div>

      <div className="movie-detail__info">
        <div className="skeleton-title animate-pulse"></div>
        <div className="skeleton-tagline animate-pulse"></div>

        <div className="movie-detail__meta">
          <div className="skeleton-meta-item animate-pulse"></div>
          <div className="skeleton-meta-item animate-pulse"></div>
          <div className="skeleton-meta-item animate-pulse"></div>
        </div>

        <div className="movie-detail__genres">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-genre-tag animate-pulse"></div>
          ))}
        </div>

        <div className="movie-detail__section">
          <div className="skeleton-section-title animate-pulse"></div>
          <div className="skeleton-text animate-pulse"></div>
          <div className="skeleton-text animate-pulse"></div>
          <div className="skeleton-text animate-pulse"></div>
        </div>

        <div className="movie-detail__section">
          <div className="skeleton-section-title animate-pulse"></div>
          <div className="skeleton-text animate-pulse"></div>
        </div>

        <div className="movie-detail__section">
          <div className="skeleton-section-title animate-pulse"></div>
          <div className="movie-detail__cast">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-cast-member animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 