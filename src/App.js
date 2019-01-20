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
  const [{ movie }, dispatch] = React.useReducer(movieReducer, {
    movie: "",
    movies: []
  });
  return (
    <div className={`App ${window.location.pathname.replace("/", "")}`}>
      <NavBar />

      <React.Suspense fallback="Loading...">
        <MovieDispatch.Provider value={dispatch}>
          <Router className="route">
            <AsyncHome path="/" />
            <AsyncSearch path="/search" />
            <AsyncMovie path="/movie" movie={movie} />
          </Router>
        </MovieDispatch.Provider>
      </React.Suspense>
    </div>
  );
};

export default App;
