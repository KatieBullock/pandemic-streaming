const addTvCarouselEvents = () => {
  const tvItems = Object.values(
    document.querySelectorAll(`[data-group = "tv"]`)
  );

  tvItems.forEach((item) => {
    item.style.display = "none";
  });

  tvItems[0].style.display = "";
  tvItems[1].style.display = "";

  let displayCount = 2;

  document.querySelector("#tv-forward").addEventListener("click", () => {
    if (tvItems[displayCount] && tvItems[displayCount + 1]) {
      tvItems[displayCount].style.display = "";
      tvItems[displayCount + 1].style.display = "";
      if (tvItems[displayCount - 1] && tvItems[displayCount - 2]) {
        tvItems[displayCount - 1].style.display = "none";
        tvItems[displayCount - 2].style.display = "none";
      }
      displayCount += 2;
    } else if (tvItems[displayCount]) {
      tvItems[displayCount].style.display = "";
      if (tvItems[displayCount - 1] && tvItems[displayCount - 2]) {
        tvItems[displayCount - 1].style.display = "none";
        tvItems[displayCount - 2].style.display = "none";
      }
      displayCount += 2;
    }
  });

  document.querySelector("#tv-back").addEventListener("click", () => {
    if (tvItems[displayCount - 4] && tvItems[displayCount - 3]) {
      tvItems[displayCount - 4].style.display = "";
      tvItems[displayCount - 3].style.display = "";
      if (tvItems[displayCount - 2] && tvItems[displayCount + -1]) {
        tvItems[displayCount - 2].style.display = "none";
        tvItems[displayCount - 1].style.display = "none";
      } else {
        tvItems[displayCount - 2].style.display = "none";
      }
      displayCount -= 2;
    }
  });
};

export { addTvCarouselEvents };
