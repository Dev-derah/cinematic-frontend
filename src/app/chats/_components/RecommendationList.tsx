import { MovieRecommendation } from "@/lib/types/recommendations";
import { MovieCard } from "@/components/MovieCard"

interface RecommendationListProps {
  recommendations: MovieRecommendation[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
}) => {
  if (recommendations.length === 0) {
    return <p>No recommendations available</p>;
  }

  return (
    <div className="space-y-6">
      {recommendations.map((movie) => (
        <MovieCard key={movie.tmdb_id} movie={movie} />
      ))}
    </div>
  );
};
