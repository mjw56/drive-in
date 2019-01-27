const peerFlix = require("./peerflix");
const fetch = require("node-fetch");
const util = require("./utility");

const movies = (req, res) => {
  fetch(`${process.env.MOVIE_API_URL}?page=${req.query.page}`)
    .then(r => r.json())
    .then(r => {
      res.send(
        Object.assign({}, { movies: util.mapMovies((r.data || {}).movies) })
      );
    });
};

const searchTerm = (req, res) => {
  fetch(`${process.env.MOVIE_API_URL}?query_term=${req.query.term}`)
    .then(r => r.json())
    .then(r => {
      res.send(
        Object.assign({}, { movies: util.mapMovies((r.data || {}).movies) })
      );
    });
};

const searchMagnet = (req, res) => {
  if (peerFlix.engine) {
    peerFlix.destroyEngine
      .call(peerFlix)
      .then(() =>
        peerFlix.connectEngine.call(peerFlix, req.query.magnet, req.query.tr)
      )
      .then(peerFlix.getStreamUrl.bind(peerFlix))
      .then(sendUrl(res));
  } else {
    peerFlix.connectEngine
      .call(peerFlix, req.query.magnet, req.query.tr)
      .then(peerFlix.getStreamUrl.bind(peerFlix))
      .then(sendUrl(res));
  }
};

function sendUrl(res) {
  return function(address) {
    res.send({ address });
  };
}

const routes = {
  movies,
  searchTerm,
  searchMagnet
};

module.exports = routes;
