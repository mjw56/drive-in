import React from "react";
import "./style.css";

function handleSearch(e) {
  console.log("handle search", e.target.value);
}

const NavBar = () => (
  <div className="header">
    <span className="logo">At the Drive-In</span>
    <i className="fa fa-film" aria-hidden="true" />

    <div className="input-container">
      <i className="fa fa-search" aria-hidden="true" />
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  </div>
);

export default NavBar;
