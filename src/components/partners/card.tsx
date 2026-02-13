"use client";

import Image from "next/image";
import { useState } from "react";

export default function Card({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="size-60 perspective-1000"
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden border-2 border-solid rounded-sm bg-gray-200 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt="imagine-parteneri"
            width="100"
            height="100"
          />
        </div>
        <div className="absolute w-full h-full backface-hidden border-2 border-solid rounded-sm bg-gray-200 flex items-center justify-center rotate-y-180">
          <h1 className="text-center p-4">{name}</h1>
        </div>
      </div>
    </div>
  );
}
