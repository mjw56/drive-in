function mapMovies(movies) {
  return movies.map(movie => {
    return {
      title: movie.title_long,
      magnet: magnetURI(movie.torrents[0].hash, movie.title_long),
      image: movie.medium_cover_image,
      rating: movie.rating,
      genre: movie.genres[0]
    };
  });
}

function magnetURI(hash, title) {
  const trackers = process.env.TRACKERS.split(";");
  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(
    title
  )}&tr=${trackers.join("&tr=")}`;
}

module.exports = {
  mapMovies
};
