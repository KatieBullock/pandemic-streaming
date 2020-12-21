const addMovieCarouselEvents = () => {
  const movieItems = Object.values(
    document.querySelectorAll(`[data-group = "movie"]`)
  );

  movieItems.forEach((item) => {
    item.style.display = "none";
  });

  movieItems[0].style.display = "";
  movieItems[1].style.display = "";

  let displayCount = 2;

  document.querySelector("#movie-forward").addEventListener("click", () => {
    if (movieItems[displayCount] && movieItems[displayCount + 1]) {
      movieItems[displayCount].style.display = "";
      movieItems[displayCount + 1].style.display = "";
      if (movieItems[displayCount - 1] && movieItems[displayCount - 2]) {
        movieItems[displayCount - 1].style.display = "none";
        movieItems[displayCount - 2].style.display = "none";
      }
      displayCount += 2;
    } else if (movieItems[displayCount]) {
      movieItems[displayCount].style.display = "";
      if (movieItems[displayCount - 1] && movieItems[displayCount - 2]) {
        movieItems[displayCount - 1].style.display = "none";
        movieItems[displayCount - 2].style.display = "none";
      }
      displayCount += 2;
    }
  });

  document.querySelector("#movie-back").addEventListener("click", () => {
    if (movieItems[displayCount - 4] && movieItems[displayCount - 3]) {
      movieItems[displayCount - 4].style.display = "";
      movieItems[displayCount - 3].style.display = "";
      if (movieItems[displayCount - 2] && movieItems[displayCount + -1]) {
        movieItems[displayCount - 2].style.display = "none";
        movieItems[displayCount - 1].style.display = "none";
      } else {
        movieItems[displayCount - 2].style.display = "none";
      }
      displayCount -= 2;
    }
  });
};

export { addMovieCarouselEvents };
