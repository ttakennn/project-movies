import { useEffect, useState } from 'react';

import type { Movie } from '../types/movie';
import { movieAPI } from '../services/api';

type MovieCategory = 'now_playing' | 'top_rated';

export const useMovies = (category: MovieCategory) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = category === 'now_playing' 
          ? await movieAPI.getNowPlaying(page)
          : await movieAPI.getTopRated(page);

        setMovies(prev => {
          const existingIds = new Set(prev.map(movie => movie.id));
          
          const newMovies = response.results.filter(movie => !existingIds.has(movie.id));
          
          return page === 1 ? response.results : [...prev, ...newMovies];
        });

        setHasMore(response.page < response.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
  };
}; 