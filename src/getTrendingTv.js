import axios from "axios";
import { API_KEY } from "./apiKey";

async function getTrendingTv() {
  try {
    const trendingResponse = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&region=US&include_adult=false`
    );
    const shows = trendingResponse.data.results;
    return shows;
  } catch (err) {
    return console.error("Error", err);
  }
}

export { getTrendingTv };
