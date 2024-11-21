"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import { CustomButton } from "./CustomButton";
import { fetchTrailer } from "@/lib/mediaService";
import { MdAdd } from "react-icons/md";
import { StarRating } from "./StarRating";
import { Media } from "@/lib/types/media";
import { getImageUrl } from "@/utils/imageUtils";
import useCarousel from "@/utils/hooks/UseCarousel";

interface CarouselProps {
  items: Media[];
  height: number;
  width: number;
  itemsToShow?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  mediaType:"movie" | "tv"
}

export const Carousel = ({
  items,
  height,
  width,
  itemsToShow = 1,
  autoplay = true,
  autoplayInterval = 5000,
  mediaType,
}: CarouselProps) => {
   const { currentIndex, handleNext, handlePrev, handleIndicatorClick } =
     useCarousel({ itemsLength: items.length, itemsToShow });
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);


  const handlePlayTrailer = async (id: number) => {
    const trailer = await fetchTrailer(mediaType, id); // Assuming it's a movie; adjust accordingly for TV shows
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
    }
  };

  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return; // Exit if autoplay is disabled

    const interval = setInterval(handleNext, autoplayInterval);

    // Clear interval on component unmount or when autoplay stops
    return () => clearInterval(interval);
  }, [autoplay, currentIndex, items.length, itemsToShow, autoplayInterval]);

  return (
    <div className="relative h-72 w-full overflow-hidden md:h-[600px]">
      <div
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / itemsToShow) * 100.02}%)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 relative bg-white">
            {item.backdrop_path && (
              <Image
                src={getImageUrl(1280, item?.backdrop_path)}
                height={height}
                width={width}
                alt={
                  item.original_title ? item.original_title : item.original_name
                }
                className="w-full h-full object-cover lg:object-fill"
              />
            )}

            {/* Text Container */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center w-4/5 z-50 space-y-4 md:bottom-20 md:space-y-7">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold md:text-4xl">
                  {item.original_title
                    ? item.original_title
                    : item.original_name}
                </h1>
                <p className="hidden md:block">{item.overview}</p>
              </div>
              <div className="w-full flex justify-center items-center gap-4">
                <button
                  className="p-2 text-sm flex items-center gap-1.5 bg-red-45 rounded-lg md:p-4 "
                  onClick={() => handlePlayTrailer(item.id)}
                >
                  <FaPlay />
                  Play Trailer
                </button>
                <button className="p-2 text-sm rounded-lg bg-black-06 border border-black-15 md:p-4">
                  <MdAdd className="text-xl" />
                </button>
                <StarRating rating={item.vote_average} />
              </div>
            </div>
            <div className="fade-bottom w-full h-full absolute bottom-0 " />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {!autoplay && (
        <>
          <CustomButton
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 p-2 rounded-md text-white"
            onclickFunction={handlePrev}
            disabled={currentIndex === 0}
            label={<FaArrowLeft />}
          />
          <button
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 p-2 rounded-md text-white ${
              currentIndex >= items.length - itemsToShow ? "hidden" : ""
            }`}
            onClick={handleNext}
            disabled={currentIndex >= items.length - itemsToShow}
          >
            <FaArrowRight />
          </button>
        </>
      )}

      {trailerUrl && (
        <div className="absolute inset-0 bg-black bg-opacity z-60 flex items-center justify-center">
          <iframe
            src={trailerUrl}
            width="80%"
            height="80%"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <CustomButton
            className="absolute top-4 right-4 text-white"
            onclickFunction={() => setTrailerUrl(null)}
            label=" Close"
          />
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-40">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`cursor-pointer w-4 h-1 mx-1 rounded-full ${
              currentIndex === index ? "bg-red-45 w-6" : "bg-black-20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
