import "../src/scss/style.scss";
import axios from "axios";
import "regenerator-runtime/runtime";
import DOMPurify from "dompurify";
import { getTrendingMovies } from "./getTrendingMovies";
import { getTrendingTv } from "./getTrendingTv";
import { addMovieCarouselEvents } from "./addMovieCarouselEvents";
import { addTvCarouselEvents } from "./addTvCarouselEvents";
import { searchMulti } from "./searchMulti";

(async () => {
  searchMulti();

  const movies = await getTrendingMovies();

  const streamingMovies = [];

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    const { id } = movie;
    async function getStreamingMovies() {
      try {
        const streamingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false`
        );
        const streamingMovie = streamingResponse.data;
        streamingMovies.push(streamingMovie);
        return streamingMovie;
      } catch (err) {
        return console.error("Error", err);
      }
    }
    await getStreamingMovies();
  }

  let buyMovie;
  let rentMovie;
  let flatrateMovie;
  const movieCarousel = document.querySelector(`#movie-carousel`);

  movies.forEach((movie) => {
    const { id } = movie;
    const { title } = movie;

    streamingMovies.forEach((streamingMovie) => {
      if (streamingMovie.results.US) {
        if (id === streamingMovie.id) {
          const movieItem = document.createElement("div");

          movieCarousel.appendChild(movieItem);

          movieItem.dataset.group = "movie";
          movieItem.className = "carousel-item";
          movieItem.insertAdjacentHTML(
            "afterbegin",
            DOMPurify.sanitize(
              `<a href="${streamingMovie.results.US.link}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""></a><a href="${streamingMovie.results.US.link}"><h2>${title}</h2></a>`
            )
          );

          if (streamingMovie.results.US.buy) {
            let buySelect = document.createElement("select");
            let buyText = document.createElement("option");

            movieItem.appendChild(buySelect);
            buySelect.appendChild(buyText);

            buyText.textContent = "Buy:";
            buyText.disabled = "disabled";

            buyMovie = streamingMovie.results.US.buy;

            buyMovie.forEach((item) => {
              let buyOption = document.createElement("option");

              buySelect.appendChild(buyOption);

              buyOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
          if (streamingMovie.results.US.rent) {
            let rentSelect = document.createElement("select");
            let rentText = document.createElement("option");

            movieItem.appendChild(rentSelect);
            rentSelect.appendChild(rentText);

            rentText.textContent = "Rent:";
            rentText.disabled = "disabled";

            rentMovie = streamingMovie.results.US.rent;

            rentMovie.forEach((item) => {
              let rentOption = document.createElement("option");

              rentSelect.appendChild(rentOption);

              rentOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
          if (streamingMovie.results.US.flatrate) {
            let flatrateSelect = document.createElement("select");
            let flatrateText = document.createElement("option");

            movieItem.appendChild(flatrateSelect);
            flatrateSelect.appendChild(flatrateText);

            flatrateText.textContent = "Stream:";
            flatrateText.disabled = "disabled";

            flatrateMovie = streamingMovie.results.US.flatrate;

            flatrateMovie.forEach((item) => {
              let flatrateOption = document.createElement("option");

              flatrateSelect.appendChild(flatrateOption);

              flatrateOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
        }
      }
    });
  });

  addMovieCarouselEvents();

  const shows = await getTrendingTv();

  const streamingShows = [];

  for (let i = 0; i < shows.length; i++) {
    let show = shows[i];
    const { id } = show;
    async function getStreamingTv() {
      try {
        const streamingResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false`
        );
        const streamingShow = streamingResponse.data;
        streamingShows.push(streamingShow);
        return streamingShow;
      } catch (err) {
        return console.error("Error", err);
      }
    }
    await getStreamingTv();
  }

  let buyShow;
  let rentShow;
  let flatrateShow;
  const tvCarousel = document.querySelector(`#tv-carousel`);

  shows.forEach((show) => {
    const { id } = show;
    const { name } = show;

    streamingShows.forEach((streamingShow) => {
      if (streamingShow.results.US) {
        if (id === streamingShow.id) {
          const tvItem = document.createElement("div");

          tvCarousel.appendChild(tvItem);

          tvItem.dataset.group = "tv";
          tvItem.className = "carousel-item";
          tvItem.insertAdjacentHTML(
            "afterbegin",
            DOMPurify.sanitize(
              `<a href="${streamingShow.results.US.link}"><img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" alt=""></a><a href="${streamingShow.results.US.link}"><h2>${name}</h2></a>`
            )
          );

          if (streamingShow.results.US.buy) {
            let buySelect = document.createElement("select");
            let buyText = document.createElement("option");

            tvItem.appendChild(buySelect);
            buySelect.appendChild(buyText);

            buyText.textContent = "Buy:";
            buyText.disabled = "disabled";

            buyShow = streamingShow.results.US.buy;

            buyShow.forEach((item) => {
              let buyOption = document.createElement("option");

              buySelect.appendChild(buyOption);

              buyOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
          if (streamingShow.results.US.rent) {
            let rentSelect = document.createElement("select");
            let rentText = document.createElement("option");

            tvItem.appendChild(rentSelect);
            rentSelect.appendChild(rentText);

            rentText.textContent = "Rent:";
            rentText.disabled = "disabled";

            rentShow = streamingShow.results.US.rent;

            rentShow.forEach((item) => {
              let rentOption = document.createElement("option");

              rentSelect.appendChild(rentOption);

              rentOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
          if (streamingShow.results.US.flatrate) {
            let flatrateSelect = document.createElement("select");
            let flatrateText = document.createElement("option");

            tvItem.appendChild(flatrateSelect);
            flatrateSelect.appendChild(flatrateText);

            flatrateText.textContent = "Stream:";
            flatrateText.disabled = "disabled";

            flatrateShow = streamingShow.results.US.flatrate;

            flatrateShow.forEach((item) => {
              let flatrateOption = document.createElement("option");

              flatrateSelect.appendChild(flatrateOption);

              flatrateOption.insertAdjacentHTML(
                "beforeend",
                DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
              );
            });
          }
        }
      }
    });
  });

  addTvCarouselEvents();
})();
