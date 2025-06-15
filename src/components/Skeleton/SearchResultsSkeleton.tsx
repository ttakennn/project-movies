import "./Skeleton.scss";

const SearchResultsSkeleton = () => {
  return (
    <div className="search-results-skeleton">
      <div className="search-results-skeleton__header">
        <div className="search-results-skeleton__title skeleton-loading" />
        <div className="search-results-skeleton__count skeleton-loading" />
      </div>

      <div className="search-results-skeleton__list">
        {Array(8).fill(null).map((_, index) => (
          <div key={index} className="search-results-skeleton__item">
            <div className="search-results-skeleton__poster skeleton-loading" />
            <div className="search-results-skeleton__content">
              <div className="search-results-skeleton__movie-title skeleton-loading" />
              <div className="search-results-skeleton__movie-info">
                <div className="search-results-skeleton__year skeleton-loading" />
                <div className="search-results-skeleton__rating skeleton-loading" />
              </div>
              <div className="search-results-skeleton__overview skeleton-loading" />
              <div className="search-results-skeleton__overview skeleton-loading" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsSkeleton; 