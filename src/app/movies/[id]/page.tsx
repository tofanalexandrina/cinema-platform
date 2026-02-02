import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { MovieService } from "@/services/movieService";

export default async function Movie({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log("movie id:", id);
  const movie = await MovieService.getById(id);

  return (
    <main>
      <div className="flex m-15">
        <div>
          <Image src={movie.posterUrl} alt={`Poster ${movie.title}`} width={230} height={345} />
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
              <Image src="/calendar.png" alt="Calendar" width={20} height={20} />
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
          <iframe src={`https://www.youtube.com/embed/${movie.trailerUrlId}`} title={`${movie.title} Trailer`} className="w-full h-full mt-5" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      </section>
      <section className="m-15">
        <h2 className="font-bold text-2xl">Galerie</h2>
        {/*opts={{ loop: true }} - for if i want to make the gallery loop */}
        <Carousel className="mt-5">
          <CarouselContent>
            {movie.imageGalleryUrls.map((imageUrl: any, index: any) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-video">
                  <Image src={imageUrl} alt={`image ${index + 1}`} fill className="object-cover rounded-lg" />
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
