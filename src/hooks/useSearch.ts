import { useEffect, useState } from 'react';

import type { Movie } from '../types/movie';
import { movieAPI } from '../services/api';

export const useSearch = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reset state when query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [query]);

  // Fetch movies when query or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setMovies([]);
        setHasMore(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await movieAPI.searchMovies(query, page);

        setMovies(prev => {
          // Remove duplicates based on movie ID
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
  }, [query, page]);

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