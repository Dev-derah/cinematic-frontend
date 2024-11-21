"use client";
import React from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getImageUrl } from "@/utils/imageUtils";
import { Media } from "@/lib/types/media";
import useCarousel from "@/utils/hooks/UseCarousel";

interface MediaCarouselProps {
  items: Media[];
  title: string;
  itemsToShow: number;
}

const MediaContentCarousel: React.FC<MediaCarouselProps> = ({
  items,
  title,
  itemsToShow,
}) => {
  const { currentIndex, handleNext, handlePrev, handleIndicatorClick } =
    useCarousel({ itemsLength: items.length, itemsToShow });
  const numberOfIndicators = Math.ceil(items.length / itemsToShow);
  return (
    <div className="w-full flex flex-col">
      <div className="relative flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {/* indicators */}
        <div className="flex gap-4 bg-black-06 border border-black-12 h-10 px-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex - 1 === -1}
            className={`${currentIndex - 1 === -1 ? "hidden" : ""}`}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <div className="flex justify-center items-center z-30">
            {Array.from({ length: numberOfIndicators }, (_, index) => (
              <div
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`cursor-pointer w-4 h-1 mx-1 rounded-full ${
                  currentIndex === index ? "bg-red-45 w-6" : "bg-black-20"
                }`}
              ></div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + 1 === items.length / itemsToShow}
            className={`${
              currentIndex + 1 === items.length / itemsToShow ? "hidden" : ""
            }}`}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto no-scrollbar lg:overflow-hidden">
        <div
          className="flex space-x-6 h-full w-full duration-500 ease-in-out "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div key={item.id + index} className="flex-none">
              {item.poster_path && (
                <div className="p-4 bg-black-10 border border-black-15 rounded-xl shadow-lg w-[260px]">
                  <Image
                    src={getImageUrl(500, item.poster_path)}
                    alt={
                      item.original_title
                        ? item.original_title
                        : item.original_name
                    }
                    width={256}
                    height={384}
                    className="w-full object-cover rounded-xl lg: min-h-[340px]"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">
                      {item.original_title
                        ? item.original_title
                        : item.original_name}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaContentCarousel;
