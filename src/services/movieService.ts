import { getDatabase } from '@/db/mongodb';
import { ObjectId } from 'mongodb';

export interface Movie {
  _id?: ObjectId;
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

export class MovieService {
  /**
   * Get all movies sorted by creation date (newest first)
   */
  static async getAll() {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const movies = await moviesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return movies;
  }

  /**
   * Get a single movie by ID
   * @throws Error if movie not found
   */
  static async getById(id: string) {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  }

  /**
   * Create a new movie
   */
  static async create(movieData: Omit<Movie, '_id' | 'createdAt' | 'updatedAt'>) {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const movieDocument = {
      ...movieData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await moviesCollection.insertOne(movieDocument);

    return {
      _id: result.insertedId,
      ...movieDocument,
    };
  }

  /**
   * Update a movie by ID
   * @throws Error if movie not found
   */
  static async update(id: string, updateData: Partial<Movie>) {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const updateDoc = {
      ...updateData,
      updatedAt: new Date(),
    };

    const result = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw new Error('Movie not found');
    }

    return result;
  }

  /**
   * Delete a movie by ID
   * @throws Error if movie not found
   */
  static async delete(id: string) {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error('Movie not found');
    }

    return { success: true };
  }
}
