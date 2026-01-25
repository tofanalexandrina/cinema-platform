import Image from "next/image";
import PresentationBanner from "@/components/homepage/presentationBanner";
import { MovieService } from "@/services/movieService";

export default async function Home() {
  const movies = await MovieService.getAll();
  const movie = movies[0]; // Get the first movie

  return (
    <main>
      <PresentationBanner />
      {movie?.posterUrl ? (
        <div>
          <Image src={movie.posterUrl} alt={movie.title || "Movie poster"} width={300} height={450} />
        </div>
      ) : (
        <p>No movie found</p>
      )}
      {movie?.posterUrl ? (
        <div>
          <Image src={movie.posterUrl} alt={movie.title || "Movie poster"} width={300} height={450} />
        </div>
      ) : (
        <p>No movie found</p>
      )}
      {movie?.posterUrl ? (
        <div>
          <Image src={movie.posterUrl} alt={movie.title || "Movie poster"} width={300} height={450} />
        </div>
      ) : (
        <p>No movie found</p>
      )}
    </main>
  );
}
