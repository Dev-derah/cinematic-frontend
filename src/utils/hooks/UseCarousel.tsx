import { useState } from "react";

interface UseCarouselProps {
  itemsLength: number;
  itemsToShow: number;
}

const useCarousel = ({ itemsLength, itemsToShow }: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < itemsLength - itemsToShow ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : itemsLength - itemsToShow
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    handleNext,
    handlePrev,
    handleIndicatorClick,
  };
};

export default useCarousel;
