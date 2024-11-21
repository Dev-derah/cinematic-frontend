"use client";
import React, { useState, useEffect } from "react";
import { SelectItem } from "./ItemSelect";
import { Genre,Media } from "@/lib/types/media";
import { fetchMediaByGenre } from "@/lib/mediaService";
import MediaContentCarousel from "@/components/MediaContentCarousel";
import SkeletonLoader from "./SkeletonLoader";


type GenreCategories = {
  movie: Genre[];
  tv: Genre[];
};
const genres: GenreCategories = {
  movie: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ],
  tv: [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ],
};


interface MediaType {
  mediaType: "movie" | "tv"
}

const GenreSelector = ({mediaType}:MediaType) => {
const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
const [mediaItems, setMediaItems] = useState<Media[]>([]);
const [loading, setLoading] = useState<boolean>(true);


 const getSelectedGenreName = () => {
   const genre = genres[mediaType].find((g) => g.id === selectedGenre);
   return genre ? genre.name : "";
 };
useEffect(() => {
  // Fetch media when the component mounts with the first genre
  const fetchInitialMedia = async () => {
    const initialGenreId = genres[mediaType][0].id;
    setSelectedGenre(initialGenreId);
    const media = await fetchMediaByGenre(mediaType, 2, initialGenreId);
    setMediaItems(media);
    setLoading(false);
  };
  fetchInitialMedia();
}, []);

const handleGenreChange = async (genreId: number) => {
  setLoading(true);
  setSelectedGenre(genreId);
  const media = await fetchMediaByGenre(mediaType,1,genreId);
  setMediaItems(media);
  setLoading(false);
};

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold">Select Genre</h2>
      <SelectItem
        items={genres[mediaType]}
        labelKey="name"
        valueKey="id"
        onChange={handleGenreChange}
        selectedValue={selectedGenre}
      />
      {loading ? (
        <SkeletonLoader count={5} className="pt-8" />
      ) : mediaItems.length > 0 ? (
        <MediaContentCarousel items={mediaItems} title={``} itemsToShow={5} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">
            No {mediaType === "movie" ? "movies" : "TV shows"} found for the{" "}
            {getSelectedGenreName()} genre.
          </p>
          <p className="text-gray-400 mt-2">
            Try selecting a different genre or check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
