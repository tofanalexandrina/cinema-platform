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
      className="border-2 border-solid rounded-sm size-60 bg-gray-200 flex items-center justify-center"
    >
      {!isFlipped ? (
        <Image src={imageUrl} alt="imagine-parteneri" width="100" height="100" />
      ) : (
        <h1>{name}</h1>
      )}
    </div>
  );
}
