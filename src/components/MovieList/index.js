import React from "react";
import { Img } from "the-platform";
import "./style.css";

const MovieList = ({ movies, movieListParams, setMovie }) => {
  return (
    <ul className="movie-list">
      {movies.map(movie => (
        <li key={movie.title} onClick={() => setMovie(movie)}>
          <React.Suspense fallback={"loading..."}>
            <Img src={movie.image} alt={movie.title} />
          </React.Suspense>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
