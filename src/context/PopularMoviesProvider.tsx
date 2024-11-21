"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchPopularMedia } from "@/lib/mediaService";
import { Media } from "@/lib/types/media";

interface PopularMoviesContextType {
  popularMovies: Media[];
  setPopularMovies: React.Dispatch<React.SetStateAction<Media[]>>;
}

const PopularMoviesContext = createContext<
  PopularMoviesContextType | undefined
>(undefined);

export const usePopularMovies = () => {
  const context = useContext(PopularMoviesContext);
  if (context === undefined) {
    throw new Error(
      "usePopularMovies must be used within a PopularMoviesProvider"
    );
  }
  return context;
};

export const PopularMoviesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);

  const fetchPopularMovies = async () => {
    if (popularMovies.length === 0) {
      const movies = await fetchPopularMedia("movie", 2);
      setPopularMovies(movies);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <PopularMoviesContext.Provider value={{ popularMovies, setPopularMovies }}>
      {children}
    </PopularMoviesContext.Provider>
  );
};
