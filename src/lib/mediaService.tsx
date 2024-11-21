interface Result {
  backdrop_path: string;
  id: number;
  name: string;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

type Genre = {
  id: number;
  name: string;
};

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BaseUrl = "https://api.themoviedb.org/3/";
const currentYear = new Date().getFullYear();

export const fetchPopularMedia = async (
  mediaType: "movie" | "tv",
  pageCount: number = 1
): Promise<Result[]> => {
  const fetchPage = (pageCount: number) =>
    fetch(
      mediaType === "movie"
        ? `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&include_adult=true&include_video=false&language=en-US&page=${pageCount}&primary_release_year=${currentYear}&sort_by=first_air_date.desc&vote_average.lte=9&with_original_language=en`
        : `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&first_air_date_year=${currentYear}&include_adult=true&include_null_first_air_dates=false&language=en-US&page=${pageCount}&sort_by=popularity.desc&vote_average.lte=8&with_original_language=en`
    );

  // Fetch multiple pages
  const responses = await Promise.all(
    Array.from({ length: pageCount }, (_, i) => fetchPage(i + 1))
  );

  // Check if any request failed
  if (responses.some((res) => !res.ok)) {
    throw new Error("Failed to fetch media data");
  }

  // Combine the results of each page
  const data = await Promise.all(responses.map((res) => res.json()));
  const combinedResults = data.flatMap((pageData) => pageData.results);
  return combinedResults;
};

export const fetchTrendingMedia = async (
  mediaType: "movie" | "tv",
  pageCount: number = 1
): Promise<Result[]> => {
  const fetchPage = (page: number) =>
    fetch(
      `${BaseUrl}trending/${mediaType}/day?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );


  // Fetch multiple pages
  const responses = await Promise.all(
    Array.from({ length: pageCount }, (_, i) => fetchPage(i + 1))
  );

  // Check if any request failed
  if (responses.some((res) => !res.ok)) {
    throw new Error("Failed to fetch media data");
  }

  // Combine the results of each page
  const data = await Promise.all(responses.map((res) => res.json()));
  const combinedResults = data.flatMap((pageData) => pageData.results);

  return combinedResults;
};

export const fetchUpcomingMedia = async (
  mediaType: "movie" | "tv",
  pageCount: number = 1
): Promise<Result[]> => {
  const fetchPage = (page: number) =>
    fetch(
      `${BaseUrl}${mediaType}/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );

  // Fetch multiple pages
  const responses = await Promise.all(
    Array.from({ length: pageCount }, (_, i) => fetchPage(i + 1))
  );

  // Check if any request failed
  if (responses.some((res) => !res.ok)) {
    throw new Error("Failed to fetch media data");
  }

  // Combine the results of each page
  const data = await Promise.all(responses.map((res) => res.json()));
  const combinedResults = data.flatMap((pageData) => pageData.results);

  return combinedResults;
};

export const fetchMediaByGenre = async (
  mediaType: "movie" | "tv",
  pageCount: number = 1,
  genreId: number
): Promise<Result[]> => {
  const fetchPage = (pageCount: number) =>
    fetch(
      `${BaseUrl}discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageCount}`
    );

  // Fetch multiple pages
  const responses = await Promise.all(
    Array.from({ length: pageCount }, (_, i) => fetchPage(i + 1))
  );

  // Check if any request failed
  if (responses.some((res) => !res.ok)) {
    throw new Error("Failed to fetch media data");
  }

  // Combine the results of each page
  const data = await Promise.all(responses.map((res) => res.json()));
  const combinedResults = data.flatMap((pageData) => pageData.results);
  return combinedResults;
};

export const getGenres = async (): Promise<Genre[]> => {
  const res = await fetch(
    `${BaseUrl}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US&page`
  );
  const data = await res.json();
  return data.genres;
};

export const fetchTrailer = async (mediaType: "movie" | "tv", id: number) => {
  try {
    const res = await fetch(
      `${BaseUrl}${mediaType}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (!res.ok) {
      alert(res.status);
      throw new Error("Failed to fetch trailer");
    }
    const data = await res.json();

    // Filter out the trailer
    const trailer = data.results.find(
      (video: { type: string }) => video.type === "Trailer"
    );

    return trailer ? trailer : null;
  } catch (error) {
    return null;
  }
};
