import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import MovieList from "../components/MovieList";
import MovieDispatch from "../context/MovieDispatch";
import * as actions from "../actions/actions";

const MovieListDataResource = createResource(page =>
  fetch(`/movies?page=${page}`).then(res => res.json())
);

export default () => {
  const [page] = React.useState(1);
  const { movies } = MovieListDataResource.read(page);
  const dispatch = React.useContext(MovieDispatch);

  React.useEffect(
    () => {
      dispatch({ type: actions.update_movie_list, movies });
    },
    [movies]
  );

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};
