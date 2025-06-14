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
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = category === 'now_playing' 
          ? await movieAPI.getNowPlaying(page)
          : await movieAPI.getTopRated(page);

        if (page === 1) {
          setMovies(response.results);
        } else {
          setMovies(prev => [...prev, ...response.results]);
        }

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