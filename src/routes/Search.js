import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import MovieList from "../components/MovieList";
import MovieDispatch from "../context/MovieDispatch";
import * as actions from "../actions/actions";

const MovieListDataResource = createResource(query =>
  fetch(`/search?term=${query}`)
    .then(res => res.json())
    .catch(console.error)
);

export default ({ query }) => {
  const { movies } = MovieListDataResource.read(query);
  const dispatch = React.useContext(MovieDispatch);

  React.useEffect(() => dispatch({ type: actions.update_movie_list, movies }), [
    movies
  ]);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};
