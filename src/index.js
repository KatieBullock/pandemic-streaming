import "../src/scss/style.scss";
import { getTrendingMovies } from "./getTrendingMovies";
import { addCarouselEventHandlers } from "./addCarouselEventHandlers";

(async () => {
  const movies = await getTrendingMovies();
  console.log(movies);

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

  console.log(streamingMovies);

  let buy;
  let rent;
  let flatrate;
  const movieCarousel = document.querySelector(`.carousel`);

  movies.forEach((movie) => {
    const { id } = movie;
    const { title } = movie;

    streamingMovies.forEach((streamingMovie) => {
      if (streamingMovie.results.US) {
        if (id === streamingMovie.id) {
          console.log(streamingMovie.results.US);

          const movieItem = document.createElement("div");

          movieCarousel.appendChild(movieItem);

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

            buy = streamingMovie.results.US.buy;

            buy.forEach((item) => {
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

            rent = streamingMovie.results.US.rent;

            rent.forEach((item) => {
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

            flatrate = streamingMovie.results.US.flatrate;

            flatrate.forEach((item) => {
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

  addCarouselEventHandlers();
})();
