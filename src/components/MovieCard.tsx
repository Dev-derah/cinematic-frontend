import Image from "next/image";
import { MovieRecommendation } from "@/lib/types/recommendations";

interface MovieCardProps {
  movie: MovieRecommendation;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="flex flex-col md:flex-row items-start bg-black-10 p-4 rounded-lg shadow-md gap-4">
      <div className="flex-shrink-0">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          className="w-24 h-36 rounded-lg object-cover"
          height={500}
          width={200}
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold">{movie.title}</h4>
        <p className="text-sm text-gray-400">{movie.description}</p>
      </div>
    </div>
  );
};
