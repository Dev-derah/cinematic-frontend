"use client"
import React from "react";
import Image from "next/image";
import { usePopularMovies } from "@/context/PopularMoviesProvider";
import { getImageUrl } from "@/utils/imageUtils";

interface MovieGridProps {
  maxItems? : number;
  gridCols? :number;
  gridRows?: number;
  isFixedBG: boolean;
  hideAfter?: number;
}
export const MovieGrid = ({
  maxItems = Infinity,
  gridCols = 4,
  gridRows,
  isFixedBG = true,
  hideAfter=0
}:MovieGridProps) => {
  const { popularMovies } = usePopularMovies();
  const gridClassName = isFixedBG
    ? `fixed w-full top-0 left-0 grid gap-4 grid-cols-${gridCols} ${
        gridRows ? `grid-rows-${gridRows}` : ""
      } md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8`
    : `grid grid-cols-4 border-8 rounded-lg border-black-15 gap-4 overflow-hidden`;

  return (
    <div className={gridClassName}>
      {popularMovies && popularMovies.length > 0 ? (
        popularMovies.slice(0, maxItems).map((result, index) => (
          <div
            key={result.id + index}
            className={`z-20 ${
              hideAfter && index >= hideAfter ? "hidden lg:block" : ""
            }`}
          >
            <Image
              className={`rounded-lg object-cover select-none w-full h-auto ${
                isFixedBG ? "lg:rounded-md lg:w-72" : ""
              }`}
              src={getImageUrl(500, result?.poster_path)}
              alt={result?.original_title}
              width={151}
              height={200}
            
            />
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};
