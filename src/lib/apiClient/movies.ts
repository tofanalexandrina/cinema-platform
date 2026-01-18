/**
 * API Client for Movies
 * Use this in client components to interact with the movies API
 */

const API_BASE = '/api/movies';

export interface Movie {
  _id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: Date;
  genre: string[];
  director: string;
  cast: string[];
  posterUrl?: string;
  trailerUrl?: string;
  imageGalleryUrls?: string[];
  language: string;
  country: string;
  ageRating: string;
  dateTimeShowing: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const moviesApi = {
  /**
   * Get all movies
   */
  getAll: async (): Promise<Movie[]> => {
    const response = await fetch(API_BASE);
    const data: ApiResponse<Movie[]> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch movies');
    }
    
    return data.data;
  },

  /**
   * Get a single movie by ID
   */
  getById: async (id: string): Promise<Movie> => {
    const response = await fetch(`${API_BASE}/${id}`);
    const data: ApiResponse<Movie> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch movie');
    }
    
    return data.data;
  },

  /**
   * Create a new movie
   */
  create: async (movie: Omit<Movie, '_id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    
    const data: ApiResponse<Movie> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create movie');
    }
    
    return data.data;
  },

  /**
   * Update a movie by ID
   */
  update: async (id: string, movie: Partial<Movie>): Promise<Movie> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    
    const data: ApiResponse<Movie> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to update movie');
    }
    
    return data.data;
  },

  /**
   * Delete a movie by ID
   */
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    const data: ApiResponse<{}> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to delete movie');
    }
  },
};
