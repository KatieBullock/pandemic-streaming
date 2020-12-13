async function getTrendingMovies() {
  try {
    const trendingResponse = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false"
    );

    const movies = trendingResponse.data.results;
    console.log(movies);
    let streamingMoviesSection = document.querySelector("#streaming-movies");

    movies.forEach((movie) => {
      const { id } = movie;
      const { title } = movie;
      async function getStreamingMovies() {
        try {
          const streamingResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false`
          );

          // console.log(streamingResponse.data);

          let streamingMovies = streamingResponse.data;
          let buy;
          let rent;
          let flatrate;
          console.log(streamingMovies);

          if (streamingMovies.results.US) {
            if (id === streamingMovies.id) {
              // console.log(movie);
              let movieDiv = document.createElement("div");
              streamingMoviesSection.appendChild(movieDiv);
              movieDiv.value = title;
              movieDiv.textContent = title;
              movieDiv.insertAdjacentHTML(
                "afterbegin",
                DOMPurify.sanitize(
                  `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">`
                )
              );

              if (streamingMovies.results.US.buy) {
                let buyDiv = document.createElement("div");
                movieDiv.appendChild(buyDiv);
                buyDiv.textContent = "Buy:";
                buy = streamingMovies.results.US.buy;
                buy.forEach((item) => {
                  buyDiv.insertAdjacentHTML(
                    "beforeend",
                    DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
                  );
                });
              }
              if (streamingMovies.results.US.rent) {
                let rentDiv = document.createElement("div");
                movieDiv.appendChild(rentDiv);
                rentDiv.textContent = "Rent:";
                rent = streamingMovies.results.US.rent;
                rent.forEach((item) => {
                  rentDiv.insertAdjacentHTML(
                    "beforeend",
                    DOMPurify.sanitize(`<p>${item.provider_name}</p>`)
                  );
                });
              }
              if (streamingMovies.results.US.flatrate) {
                let flatrateDiv = document.createElement("div");
                movieDiv.appendChild(flatrateDiv);
                flatrateDiv.textContent = "Stream:";
                flatrate = streamingMovies.results.US.flatrate;
                flatrate.forEach((item) => {
                  flatrateDiv.insertAdjacentHTML(
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
