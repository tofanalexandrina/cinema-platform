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
  trailerUrlId?: string;
  imageGalleryUrls?: string[];
  language: string;
  country: string;
  ageRating: string;
  dateTimeShowing: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
