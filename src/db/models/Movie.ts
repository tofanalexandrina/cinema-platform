import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  description: string;
  duration: number; // in minutes
  releaseDate: Date;
  genre: string[];
  director: string;
  cast: string[];
  rating: number; // e.g., 0-10 or 0-5
  posterUrl?: string;
  trailerUrl?: string;
  language: string;
  country: string;
  ageRating?: string; // e.g., "PG", "PG-13", "R", "18+"
  isActive: boolean; // whether the movie is currently showing
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a movie description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide movie duration'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Please provide a release date'],
    },
    genre: {
      type: [String],
      required: [true, 'Please provide at least one genre'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one genre is required',
      },
    },
    director: {
      type: String,
      required: [true, 'Please provide director name'],
      trim: true,
    },
    cast: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [10, 'Rating cannot be more than 10'],
      default: 0,
    },
    posterUrl: {
      type: String,
      trim: true,
    },
    trailerUrl: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'Please provide movie language'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please provide country of origin'],
      trim: true,
    },
    ageRating: {
      type: String,
      enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', '18+', 'U', 'UA', 'A'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
MovieSchema.index({ title: 'text', description: 'text' });
MovieSchema.index({ genre: 1 });
MovieSchema.index({ isActive: 1 });

export default mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);
