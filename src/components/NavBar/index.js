import React from "react";
import { DebounceInput } from "react-debounce-input";
import MovieDispatch from "../../context/MovieDispatch";
import * as actions from "../../actions/actions";
import { navigate } from "@reach/router";
import "./style.css";

const NavBar = () => {
  const dispatch = React.useContext(MovieDispatch);
  function handleSearch(e) {
    dispatch({ type: actions.movie_search_query, query: e.target.value });
    navigate("/search");
  }

  return (
    <div className={`header ${window.location.pathname.replace("/", "")}`}>
      <span className="logo">At the Drive-In</span>
      <i className="fa fa-film" aria-hidden="true" />

      <div className="input-container">
        <i className="fa fa-search" aria-hidden="true" />
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className="form-control"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default NavBar;
