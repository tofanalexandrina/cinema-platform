import { getDatabase } from '@/db/mongodb';
import { ObjectId } from 'mongodb';
import { Movie } from '@/types/movie';

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
      releaseDate: new Date(movieData.releaseDate),
      dateTimeShowing: new Date(movieData.dateTimeShowing),
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

    const updateDoc: any = {
      ...updateData,
      updatedAt: new Date(),
    };

    // Convert date strings to Date objects
    if (updateDoc.releaseDate) {
      updateDoc.releaseDate = new Date(updateDoc.releaseDate);
    }
    if (updateDoc.dateTimeShowing) {
      updateDoc.dateTimeShowing = new Date(updateDoc.dateTimeShowing);
    }

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

  /**
   * Get movies showing today and tomorrow
   */
  static async getTodayAndTomorrowMovies() {
    const db = await getDatabase();
    const moviesCollection = db.collection('movies');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    console.log('Query range (local time):', {
      today: today.toLocaleString(),
      todayISO: today.toISOString(),
      dayAfterTomorrow: dayAfterTomorrow.toLocaleString(),
      dayAfterTomorrowISO: dayAfterTomorrow.toISOString()
    });

    const movies = await moviesCollection
      .find({
        dateTimeShowing: {
          $gte: today,
          $lt: dayAfterTomorrow,
        },
      })
      .sort({ dateTimeShowing: 1 })
      .toArray();

    console.log('Fetched movies for today and tomorrow:', movies);

    return movies;
  }
}
