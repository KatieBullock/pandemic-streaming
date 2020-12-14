import "../src/scss/style.scss";
import { getTrendingMovies } from "./getTrendingMovies";
import { findMovieItemGroups } from "./findMovieItemGroups";

(async () => {
  await getTrendingMovies();
  findMovieItemGroups();
})();
