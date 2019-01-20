import React from "react";
import { Img } from "the-platform";
import MovieDispatch from "../../context/MovieDispatch";
import * as actions from "../../actions/actions";
import { navigate } from "@reach/router";
import "./style.css";

const MovieList = ({ movies, movieListParams, setMovie }) => {
  const dispatch = React.useContext(MovieDispatch);
  function updateSelectedMovie(e) {
    dispatch({ type: actions.load_movie, movie: e.target.getAttribute("alt") });
    navigate("/movie");
  }
  return (
    <ul className="movie-list">
      {movies.map(movie => (
        <li key={movie.title} onClick={updateSelectedMovie}>
          <React.Suspense fallback={"loading..."}>
            <Img src={movie.image} alt={movie.title} />
          </React.Suspense>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
