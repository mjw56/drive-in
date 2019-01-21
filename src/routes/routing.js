import React from "react";
import { Router } from "@reach/router";

const AsyncHome = React.lazy(() => import("./Home"));
const AsyncSearch = React.lazy(() => import("./Search"));
const AsyncMovie = React.lazy(() => import("./Movie/Movie"));

export default ({ searchQuery, movie }) => (
  <Router className="route">
    <AsyncHome path="/" />
    <AsyncSearch path="/search" query={searchQuery} />
    <AsyncMovie path="/movie" movie={movie} />
  </Router>
);
