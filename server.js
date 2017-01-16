const express = require('express');
const http = require('http');
const concat = require('concat-stream');
const peerflix = require('peerflix');
const path = require('path');

const app = express();

require('now-logs')('logs');

// the peerflix engine
let engine;

function getStreamUrl(engine, res) {
  engine.server.on('listening', () => {
    var myLink = 'http://localhost:' + engine.server.address().port + '/';

    res.send({ address: myLink });
  })
}

app.set('port', (process.env.PORT || 3001));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/movies/:page?', function(req, res) {
  const query = "http://yify.is/index.php/api/v2/list_movies.json";

  http.get({
      host: 'yify.is',
      path: `/index.php/api/v2/list_movies.json?page=${req.query.page}`,
  }, function(response) {
      response.setEncoding('utf8');
      response.pipe(concat(function(body) {
          try {
              // try to prevent known bad JSON from this api
              const json = JSON.stringify(body);
              const fixedJson = json.replace(':,', ': 0,');

              const parsed = JSON.parse(JSON.parse(fixedJson));

              res.send(Object.assign(
                  {},
                  { movies: mapMovies((parsed.data || {}).movies) }
              ));
          } catch (e) {
              console.log('json parse failed', e);

              res.send(Object.assign(
                  {},
                  { movies: [] }
              ));
          }
      }))
  });
})
.get('/torrent-stream/:magnet?', function(req, res) {
  if(engine) {
    engine.destroy(function() {
      engine = peerflix(req.query.magnet, {
          trackers: req.query.tr,
          connections: 100,
      });
      getStreamUrl(engine, res);
    })
  } else {
    engine = peerflix(req.query.magnet, {
        trackers: req.query.tr,
        connections: 100,
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
    }
  });
}

function magnetURI(hash, title) {
  const trackers = [
    'udp://open.demonii.com:1337',
    'http://tracker.yify-torrents.com/announce',
    'udp://tracker.publicbt.com:80',
    'udp://tracker.openbittorrent.com:80',
    'udp://tracker.coppersurfer.tk:6969',
    'udp://exodus.desync.com:6969',
    'http://exodus.desync.com:6969/announce'
  ];

  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(title)}&tr=${trackers.join('&tr=')}`;
}

app.listen(app.get('port'), () => {
  console.log(`Node server running at http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
