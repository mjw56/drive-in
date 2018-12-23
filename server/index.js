const express = require("express");
const http = require("http");
const concat = require("concat-stream");
const peerflix = require("peerflix");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

// peerflix engine
let engine;
function getStreamUrl(engine, res) {
  engine.server.on("listening", () => {
    var myLink = "http://localhost:" + engine.server.address().port + "/";

    res.send({ address: myLink });
  });
}

app.set("port", process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, "build")));

app
  .get("/movies/:page?", (req, res) => {
    fetch(`${process.env.MOVIE_API_URL}?page=${req.query.page}`)
      .then(r => r.json())
      .then(r => {
        res.send(
          Object.assign({}, { movies: mapMovies((r.data || {}).movies) })
        );
      });
  })
  .get("/search/:term?", (req, res) => {
    fetch(`${process.env.MOVIE_API_URL}?query_term=${req.query.term}`)
      .then(r => r.json())
      .then(r => {
        res.send(
          Object.assign({}, { movies: mapMovies((r.data || {}).movies) })
        );
      });
  })
  .get("/stream/:magnet?", function(req, res) {
    if (engine) {
      engine.destroy(function() {
        engine = peerflix(req.query.magnet, {
          trackers: req.query.tr,
          connections: 100
        });
        getStreamUrl(engine, res);
      });
    } else {
      engine = peerflix(req.query.magnet, {
        trackers: req.query.tr,
        connections: 100
      });
      getStreamUrl(engine, res);
    }
  });

function mapMovies(movies) {
  return movies.map(movie => {
    return {
      title: movie.title_long,
      magnet: magnetURI(movie.torrents[0].hash, movie.title_long),
      image: movie.medium_cover_image,
      rating: movie.rating,
      genre: movie.genres[0]
    };
  });
}

function magnetURI(hash, title) {
  const trackers = process.env.TRACKERS.split(";");
  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(
    title
  )}&tr=${trackers.join("&tr=")}`;
}

app.listen(app.get("port"), () => {
  console.log(`Node server running at http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
