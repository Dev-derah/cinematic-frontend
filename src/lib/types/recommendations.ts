
export interface MovieRecommendation {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tmdbId: string;
}

export interface Prompt {
  id: string;
  prompt: string;
  recommendations: MovieRecommendation[];
}