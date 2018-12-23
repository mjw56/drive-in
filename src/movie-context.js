import React from "react";

const MovieContext = React.createContext({
  movie: "",
  updateMovie: () => {}
});

export default MovieContext;
