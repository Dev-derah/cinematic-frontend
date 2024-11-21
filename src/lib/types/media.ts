// types/media.ts
export interface Media {
  backdrop_path: string;
  id: number;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}



export interface Genre {
  id: number;
  name: string;
}