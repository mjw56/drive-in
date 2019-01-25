import React from "react";
import "./Movie.css";

const Movie = ({ movie }) => {
  const { useEffect, useState } = React;
  const [streamUrl, setStreamUrl] = useState("");
  const setUrl = address => setStreamUrl(address);

  useEffect(
    () => {
      fetch(`/stream?magnet=${movie.magnet}`)
        .then(res => res.json())
        .then(res => res.address)
        .then(setUrl)
        .catch(console.error);
    },
    [movie]
  );

  return (
    <div className="Movie">
      <button className="back-btn" onClick={() => window.history.back()}>
        <span className="fa fa-arrow-circle-o-left" aria-hidden="true" />
      </button>
      <video src={streamUrl} autoPlay controls />
    </div>
  );
};

export default Movie;
