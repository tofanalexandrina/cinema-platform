"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import homepageResources from "@/lib/resources/homepageResources";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function RunningTodayBanner() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieRunningToday, setMovieRunningToday] = useState<Movie | null>(null);
  const [movieRunningTomorrow, setMovieRunningTomorrow] = useState<Movie | null>(null);
  const [carouselState, setCarouselState] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies/today-tomorrow");
      const data = await response.json();

      if (data.success) {
        setMovies(data.data);
      } else {
        setError(data.error || "Failed to fetch movies");
      }
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setMovieRunningToday(movies[0] || null);
      setMovieRunningTomorrow(movies[1] || null);
    }
  }, [movies]);

  if (loading) {
    return (
      <div className="flex h-80 w-full bg-linear-to-r from-gray-200 from-40% to-stone-400 to-70% justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies showing today or tomorrow. Check back soon!</div>;
  }

  return (
    <div className="flex h-auto w-full bg-linear-to-r from-gray-200 from-40% to-stone-400 to-70%">
      {/* text */}
      <div className="w-1/2 flex flex-col gap-20 justify-between pl-5 py-4 transition-opacity duration-500">
        <div>
          <h2 className="font-sf-compact font-medium text-2xl">{carouselState ? homepageResources.runningToday : homepageResources.runningTomorrow}</h2>
        </div>
        <div className="relative min-h-32">
          {/* Today's movie */}
          {movieRunningToday && (
            <div className={`transition-opacity duration-500 ${carouselState ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
              <h1 className="font-sf-compact font-semibold text-5xl">{`${movieRunningToday.title} (${new Date(movieRunningToday.releaseDate).getFullYear()})`}</h1>
              <p className="font-sf-compact font-extralight text-lg mt-2">{`${new Date(movieRunningToday.dateTimeShowing).toLocaleDateString("ro-RO", { day: "numeric", month: "long" })} | ${new Date(movieRunningToday.dateTimeShowing).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`}</p>
            </div>
          )}
          {/* Tomorrow's movie */}
          {movieRunningTomorrow && (
            <div className={`transition-opacity duration-500 ${!carouselState ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
              <h1 className="font-sf-compact font-semibold text-5xl">{`${movieRunningTomorrow.title} (${new Date(movieRunningTomorrow.releaseDate).getFullYear()})`}</h1>
              <p className="font-sf-compact font-extralight text-lg mt-2">{`${new Date(movieRunningTomorrow.dateTimeShowing).toLocaleDateString("ro-RO", { day: "numeric", month: "long" })} | ${new Date(movieRunningTomorrow.dateTimeShowing).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            onClick={() => {
              const movieId = carouselState ? movieRunningToday?._id : movieRunningTomorrow?._id;
              if (movieId) {
                window.location.href = `/movies/${movieId}`;
              }
            }}
            className="bg-neutral-800 text-white font-sf-compact font-medium px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors duration-200"
          >
            {homepageResources.viewDetails}{" "}
          </button>
        </div>
      </div>
      {/* image and direction arrow */}
      <div className="w-1/2 flex items-center justify-end py-8 pr-8 gap-6">
        {/* Poster Image */}
        <div className="relative w-56 h-84">
          {movieRunningToday && movieRunningToday.posterUrl && <Image src={movieRunningToday.posterUrl} alt={movieRunningToday.title} width={224} height={336} className={`absolute inset-0 object-cover shadow-2xl transition-opacity duration-500 ${carouselState ? "opacity-100" : "opacity-0"}`} priority />}
          {movieRunningTomorrow && movieRunningTomorrow.posterUrl && <Image src={movieRunningTomorrow.posterUrl} alt={movieRunningTomorrow.title} width={224} height={336} className={`absolute inset-0 object-cover shadow-2xl transition-opacity duration-500 ${!carouselState ? "opacity-100" : "opacity-0"}`} />}
        </div>
        {/* Navigation Arrow */}
        {movies.length > 1 && (
          <button onClick={() => setCarouselState(!carouselState)} className="hover:scale-110 transition-all duration-200" aria-label="Next movie">
            <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}
