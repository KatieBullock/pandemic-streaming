async function getTrendingTv() {
  try {
    const trendingResponse = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=d231975905a7208744f2904932557125&language=en-US&region=US&include_adult=false"
    );
    const shows = trendingResponse.data.results;
    return shows;
  } catch (err) {
    return console.error("Error", err);
  }
}

export { getTrendingTv };
