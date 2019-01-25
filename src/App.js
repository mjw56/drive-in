import React from "react";
import NavBar from "./components/NavBar";
import MovieDispatch from "./context/MovieDispatch";
import movieReducer from "./reducers/moviesReducer";
import Routing from "./routes/routing";
import "./App.css";

const App = () => {
  let initialState = { movie: "", movies: [] };
  const [{ movie, searchQuery }, dispatch] = React.useReducer(
    movieReducer,
    initialState
  );
  return (
    <div className={`App ${window.location.pathname.replace("/", "")}`}>
      <MovieDispatch.Provider value={dispatch}>
        <NavBar />

        <React.Suspense fallback="Loading...">
          <Routing searchQuery={searchQuery} movie={movie} />
        </React.Suspense>
      </MovieDispatch.Provider>
    </div>
  );
};

export default App;
