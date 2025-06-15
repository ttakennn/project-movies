import "./Skeleton.scss";

interface MovieCardSkeletonProps {
  view: "list" | "grid";
}

export const MovieCardSkeleton = ({ view }: MovieCardSkeletonProps) => {
  if (view === "list") {
    return (
      <div className="search-results-skeleton">
        <div className="search-results-skeleton__list">
          {Array(8)
            .fill(null)
            .map((_, index) => (
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
  }

  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image animate-pulse"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__title animate-pulse"></div>
        <div className="skeleton-card__info animate-pulse"></div>
      </div>
    </div>
  );
};
