
export interface MovieRecommendation {
  tmdb_id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
}

export interface Prompt {
  id: string;
  prompt: string;
  createdAt: string;
  movies: MovieRecommendation[];
}