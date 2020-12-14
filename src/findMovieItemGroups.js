const findMovieItemGroups = () => {
  const movieItems = Object.values(document.querySelectorAll(`.item`));

  movieItems.forEach((movieItem, index) => {
    if (index <= 1) {
      movieItem.dataset.group = "item-1";
    } else if (index <= 3) {
      movieItem.dataset.group = "item-2";
    } else if (index <= 5) {
      movieItem.dataset.group = "item-3";
    } else if (index <= 7) {
      movieItem.dataset.group = "item-4";
    } else if (index <= 9) {
      movieItem.dataset.group = "item-5";
    } else if (index <= 11) {
      movieItem.dataset.group = "item-6";
    } else if (index <= 13) {
      movieItem.dataset.group = "item-7";
    } else if (index <= 15) {
      movieItem.dataset.group = "item-8";
    } else if (index <= 17) {
      movieItem.dataset.group = "item-9";
    } else if (index <= 19) {
      movieItem.dataset.group = "item-10";
    }
  });
};

export { findMovieItemGroups };
