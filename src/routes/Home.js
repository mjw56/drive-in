import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import MovieList from "../components/MovieList";
import { useInView } from "react-intersection-observer";

const MovieListDataResource = createResource(page =>
  fetch(`/movies?page=${page}`).then(res => res.json())
);

export default () => {
  const mountRef = React.useRef();
  const [page, setPage] = React.useState(1);
  const { movies } = MovieListDataResource.read(page);

  const endListRef = React.useRef(null);
  const endOfList = useInView(endListRef, {
    threshold: 0
  });

  console.log("end of page?", endOfList);

  return (
    <div>
      <MovieList movies={movies} />
      <div ref={endListRef} />
    </div>
  );
};
