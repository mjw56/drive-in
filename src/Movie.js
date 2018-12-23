import React from "react";
import "./Movie.css";

const Movie = ({ movie }) => {
  const { useEffect, useState } = React;
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(
    () => {
      fetch(`/stream?magnet=${movie}`)
        .then(res => res.json())
        .then(res => {
          setStreamUrl(res.address);
        });
    },
    [movie]
  );

  return (
    <div className="Movie">
      <div className="back-btn">
        <span className="fa fa-arrow-circle-o-left" aria-hidden="true" />
      </div>
      <video src={streamUrl} autoPlay controls />
    </div>
  );
};

export default Movie;
