import axios from "axios";
import { API_KEY } from "./apiKey";

async function getTrendingMovies() {
  try {
    const trendingResponse = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&region=US&include_adult=false`
    );
    const movies = trendingResponse.data.results;
    return movies;
  } catch (err) {
    return console.error("Error", err);
  }
}

export { getTrendingMovies };
