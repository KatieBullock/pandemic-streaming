async function getTrendingMovies() {
  try {
    const trendingResponse = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false"
    );

    const movies = trendingResponse.data.results;
    console.log(movies);
    const movieCarousel = document.querySelector(`[data-target="carousel"]`);

    movies.forEach((movie) => {
      const { id } = movie;
      const { title } = movie;
      async function getStreamingMovies() {
        try {
          const streamingResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false`
          );

          let streamingMovie = streamingResponse.data;
          let buy;
          let rent;
          let flatrate;

          if (streamingMovie.results.US) {
            if (id === streamingMovie.id) {
              console.log(streamingMovie.results.US);
              const movieItem = document.createElement("div");
              movieCarousel.appendChild(movieItem);
              movieItem.className = "item";
              movieItem.insertAdjacentHTML(
                "afterbegin",
                DOMPurify.sanitize(
                  `<a href="${streamingMovie.results.US.link}" target="_blank"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""></a>
                  <a href="${streamingMovie.results.US.link}" target="_blank"><p>${title}</p></a>`
                )
              );

              if (streamingMovie.results.US.buy) {
                let buySelect = document.createElement("select");
                movieItem.appendChild(buySelect);

                let buyText = document.createElement("option");
                buyText.textContent = "Buy:";
                buySelect.appendChild(buyText);
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
                movieItem.appendChild(rentSelect);

                let rentText = document.createElement("option");
                rentText.textContent = "Rent:";
                rentSelect.appendChild(rentText);
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
                movieItem.appendChild(flatrateSelect);

                let flatrateText = document.createElement("option");
                flatrateText.textContent = "Stream:";
                flatrateSelect.appendChild(flatrateText);
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
        } catch (err) {
          return console.error("Error", err);
        }
      }
      getStreamingMovies();
    });
  } catch (err) {
    return console.error("Error", err);
  }
}

export { getTrendingMovies };
