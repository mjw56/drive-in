import React from "react";
import { Router } from "@reach/router";
import NavBar from "./components/NavBar";
import MovieDispatch from "./context/MovieDispatch";
import movieReducer from "./reducers/moviesReducer";
import "./App.css";

const AsyncHome = React.lazy(() => import("./routes/Home"));
const AsyncSearch = React.lazy(() => import("./routes/Search"));
const AsyncMovie = React.lazy(() => import("./routes/Movie/Movie"));

const App = () => {
  const [{ movie, searchQuery }, dispatch] = React.useReducer(movieReducer, {
    movie: "",
    movies: []
  });
  return (
    <div className={`App ${window.location.pathname.replace("/", "")}`}>
      <MovieDispatch.Provider value={dispatch}>
        <NavBar />

        <React.Suspense fallback="Loading...">
          <Router className="route">
            <AsyncHome path="/" />
            <AsyncSearch path="/search" query={searchQuery} />
            <AsyncMovie path="/movie" movie={movie} />
          </Router>
        </React.Suspense>
      </MovieDispatch.Provider>
    </div>
  );
};

export default App;
