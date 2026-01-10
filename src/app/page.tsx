import Image from "next/image";
import { getDatabase } from "@/db/mongodb";

async function getMovie() {
  const db = await getDatabase("cinema-platform");
  return db.collection("movies").findOne({});
}

export default async function Home() {
  const movie = await getMovie();
  
  return (
    <main>      
      {movie?.posterUrl ? (
        <div>
          <Image
            src={movie.posterUrl}
            alt={movie.title || "Movie poster"}
            width={300}
            height={450}
          />
        </div>
      ) : (
        <p>No movie found</p>
      )}
    </main>
  );
}
