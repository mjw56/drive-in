import React from "react";
import { navigate, Router } from "@reach/router";
import NavBar from "./components/NavBar";
import MovieContext from "./movie-context";
import "./App.css";

const AsyncHome = React.lazy(() => import("./routes/Home"));
const AsyncSearch = React.lazy(() => import("./routes/Search"));

const App = () => {
  const { useState } = React;
  const [movie, setMovie] = useState("");
  const [movieListParams, setMovieListParams] = useState({});

  function handleMovieSelection(movie) {
    setMovie(movie.magnet);
    setTimeout(() => {
      navigate("/movie");
    });
  }

  return (
    <div className="App">
      <NavBar />

      <React.Suspense fallback="Loading...">
        <MovieContext.Provider>
          <Router>
            <AsyncHome path="/" />
            <AsyncSearch path="/search" />
          </Router>
        </MovieContext.Provider>
      </React.Suspense>
    </div>
  );
};

export default App;
