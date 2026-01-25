import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { MovieService } from "@/services/movieService";

export default async function Movie({ params }: { params: { id: string } }) {
  // const movie = await MovieService.getById(params.id);
  const movie = {
    _id: "695d84c48f0f9b19b083ae37",
    title: "Inception",
    description:
      "Mintea ta este scena crimei. Cobb, un hoț iscusit care comite spionaj corporativ prin infiltrarea în subconștientul țintelor sale, primește șansa de a-și recâștiga vechea viață ca plată pentru o sarcină considerată imposibilă: „inception”, implantarea ideii altei persoane în subconștientul unei ținte.",
    duration: 148,
    releaseDate: "2010-07-16",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Marion Cotillard",
    ],
    posterUrl:
      "https://res.cloudinary.com/dud0oiww7/image/upload/v1768740132/inception_sbshsh.jpg",
    trailerUrlId: "YoHD9XEInc0",
    imageGalleryUrls: [
      "https://res.cloudinary.com/dud0oiww7/image/upload/v1769354694/inception1_fdagaa.webp",
      "https://res.cloudinary.com/dud0oiww7/image/upload/v1769354694/inception2_dthjzg.jpg",
      "https://res.cloudinary.com/dud0oiww7/image/upload/v1769354694/inception3_zn3hqo.jpg",
      "https://res.cloudinary.com/dud0oiww7/image/upload/v1769354693/imception4_lp4kme.jpg",
    ],
    language: "English",
    country: "USA",
    ageRating: "PG-13",
    dateTimeShowing: "2026-01-15T19:30:00.000Z",
  };

  return (
    <main>
      <div className="flex m-15">
        <div>
          <Image
            src={movie.posterUrl}
            alt={`Poster ${movie.title}`}
            width={230}
            height={345}
          />
        </div>
        <div className="flex-1 pl-8">
          <div className="flex items-baseline gap-2">
            <h1 className="font-bold text-4xl">{movie.title}</h1>
            <p>{new Date(movie.releaseDate).getFullYear()}</p>
          </div>
          <div className="flex gap-5 mt-3 mb-3">
            <div className="p-2 bg-gray-300 rounded-lg">
              <p>{movie.duration} minute</p>
            </div>
            <div className="p-2 bg-amber-400 rounded-lg">
              <p>{movie.ageRating}</p>
            </div>
            <div className="p-2 bg-gray-300 rounded-lg">
              <p>{movie.country}</p>
            </div>
          </div>
          <div>
            <p>
              Regizat de <strong>{movie.director}</strong>
            </p>
          </div>
          <div>
            <p>
              <strong>Distributie: </strong>
              {movie.cast.join(", ")}
            </p>
          </div>
          <div className=" mt-7 mb-7 p-3 bg-amber-400 rounded-lg flex items-center gap-4 w-fit">
            <div className="flex items-center gap-1">
              <Image
                src="/calendar.png"
                alt="Calendar"
                width={20}
                height={20}
              />
              <span>
                {new Date(movie.dateTimeShowing).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Image src="/clock.png" alt="Clock" width={20} height={20} />
              <span>
                {new Date(movie.dateTimeShowing).toLocaleTimeString("ro-RO", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <div>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
      <section className="m-15">
        <h2 className="font-bold text-2xl">Trailer</h2>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailerUrlId}`}
            title={`${movie.title} Trailer`}
            className="w-full h-full mt-5"
            allow="fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
      <section className="m-15">
        <h2 className="font-bold text-2xl">Galerie</h2>
        {/*opts={{ loop: true }} - for if i want to make the gallery loop */}
        <Carousel className="mt-5">
          <CarouselContent>
            {movie.imageGalleryUrls.map((imageUrl, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-video">
                  <Image
                    src={imageUrl}
                    alt={`image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}
