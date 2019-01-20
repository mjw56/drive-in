import React from "react";
import "./Movie.css";

const Movie = ({ movie }) => {
  const { useEffect, useState } = React;
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(
    () => {
      fetch(`/stream?magnet=${movie.magnet}`)
        .then(res => res.json())
        .then(res => {
          setStreamUrl(res.address);
        });
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
