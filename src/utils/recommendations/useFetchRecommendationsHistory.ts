import { useAuth } from "@/context/AuthContext";
import axiosClient from "../axiosClient";

const useFetchRecommendationsHistory = () => {
  const { isAuthenticated } = useAuth();
  const fetchRecommendationsHistory = async () => {
    console.log("Fetch recommendations", isAuthenticated);
    if (!isAuthenticated) {
      throw new Error("User is not authenticated.");
    }
    try {
      console.log("Fetch recommendations2");
      const response = await axiosClient.get("/api/recommendations/history/");
      return response.data.recommendations || [];
    } catch (error) {
      return [];
    }
  };

  return { fetchRecommendationsHistory };
};

export default useFetchRecommendationsHistory;
