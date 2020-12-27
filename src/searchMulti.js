import axios from "axios";
import DOMPurify from "dompurify";

const searchMulti = () => {
  const form = document.querySelector("#search-form");
  const searchDisplay = document.querySelector("#search-result");
  const searchBox = document.querySelector("#search-box");

  async function searchDB() {
    try {
      const userInput = encodeURI(searchBox.value);
      const searchResponse = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=d231975905a7208744f2904932557125&language=en-US&query=${userInput}&page=1&include_adult=false`
      );
      const searchResults = searchResponse.data.results;
      return searchResults;
    } catch (err) {
      return console.error("Error", err);
    }
  }

  async function addSearchContent() {
    try {
      const searchResults = await searchDB();
      searchResults.forEach((searchResult) => {
        if (searchResult.media_type === "movie" && searchResult.poster_path) {
          const { id } = searchResult;
          const { title } = searchResult;
          searchDisplay.insertAdjacentHTML(
            "beforeend",
            DOMPurify.sanitize(
              `<div data-group="search" class="carousel-item"><a href="https://www.themoviedb.org/movie/${id}-${title}/watch?locale=US"><img src="https://image.tmdb.org/t/p/w500/${searchResult.poster_path}" alt=""></a><a href="https://www.themoviedb.org/movie/${id}-${title}/watch?locale=US"><h2>${title}</h2></a><div>`
            )
          );
        }
        if (searchResult.media_type === "tv" && searchResult.poster_path) {
          const { id } = searchResult;
          const { name } = searchResult;
          searchDisplay.insertAdjacentHTML(
            "beforeend",
            DOMPurify.sanitize(
              `<div data-group="search" class="carousel-item"><a href="https://www.themoviedb.org/tv/${id}-${name}/watch?locale=US"><img src="https://image.tmdb.org/t/p/w500/${searchResult.poster_path}" alt=""></a><a href="https://www.themoviedb.org/tv/${id}-${name}/watch?locale=US"><h2>${name}</h2></a><div>`
            )
          );
        }
      });
    } catch (err) {
      return console.error("Error", err);
    }
  }

  async function addSearchCarouselEvents() {
    try {
      await addSearchContent();
      const searchItems = Object.values(
        document.querySelectorAll(`[data-group = "search"]`)
      );
      searchItems.forEach((item) => {
        item.style.display = "none";
      });

      searchItems[0].style.display = "";
      searchItems[1].style.display = "";

      let displayCount = 2;

      document
        .querySelector("#search-forward")
        .addEventListener("click", () => {
          if (searchItems[displayCount] && searchItems[displayCount + 1]) {
            searchItems[displayCount].style.display = "";
            searchItems[displayCount + 1].style.display = "";
            if (
              searchItems[displayCount - 1] &&
              searchItems[displayCount - 2]
            ) {
              searchItems[displayCount - 1].style.display = "none";
              searchItems[displayCount - 2].style.display = "none";
            }
            displayCount += 2;
          } else if (searchItems[displayCount]) {
            searchItems[displayCount].style.display = "";
            if (
              searchItems[displayCount - 1] &&
              searchItems[displayCount - 2]
            ) {
              searchItems[displayCount - 1].style.display = "none";
              searchItems[displayCount - 2].style.display = "none";
            }
            displayCount += 2;
          }
        });

      document.querySelector("#search-back").addEventListener("click", () => {
        if (searchItems[displayCount - 4] && searchItems[displayCount - 3]) {
          searchItems[displayCount - 4].style.display = "";
          searchItems[displayCount - 3].style.display = "";
          if (searchItems[displayCount - 2] && searchItems[displayCount + -1]) {
            searchItems[displayCount - 2].style.display = "none";
            searchItems[displayCount - 1].style.display = "none";
          } else {
            searchItems[displayCount - 2].style.display = "none";
          }
          displayCount -= 2;
        }
      });
    } catch (err) {
      return console.error("Error", err);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    searchDisplay.innerHTML = "";
    addSearchCarouselEvents();
  });
};

export { searchMulti };
