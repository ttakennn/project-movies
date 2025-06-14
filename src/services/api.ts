import type { MovieResponse } from "../types/movie";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = import.meta.env.VITE_TMDB_API_URL;

const api = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

export const movieAPI = {
  getNowPlaying: async (page = 1): Promise<MovieResponse> => {
    try {
      const response = await api.get<MovieResponse>("/movie/now_playing", {
        params: {
          page,
          language: "en-US",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.status_message ||
            "Failed to fetch now playing movies"
        );
      }
      throw error;
    }
  },

  getTopRated: async (page = 1): Promise<MovieResponse> => {
    try {
      const response = await api.get<MovieResponse>("/movie/top_rated", {
        params: {
          page,
          language: "en-US",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.status_message ||
            "Failed to fetch top rated movies"
        );
      }
      throw error;
    }
  },

  searchMovies: async (query: string, page = 1): Promise<MovieResponse> => {
    try {
      const response = await api.get<MovieResponse>("/search/movie", {
        params: {
          query,
          page,
          language: "en-US",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.status_message ||
            "Failed to search movies"
        );
      }
      throw error;
    }
  },

  // Helper function to get full image URL
  getImageUrl: (path: string, size: "w500" | "original" = "w500"): string | null => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};

