const peerflix = require("peerflix");

class Peerflix {
  constructor() {
    this.engine = null;
  }

  connectEngine(magnet, tracker) {
    return new Promise((resolve, reject) => {
      this.engine = peerflix(magnet, {
        trackers: tracker,
        connections: 100
      });
      resolve(this.engine);
    });
  }

  destroyEngine() {
    return new Promise((resolve, reject) => {
      this.engine.destroy(() => {
        resolve();
      });
    });
  }

  getStreamUrl(res) {
    return new Promise((resolve, reject) => {
      this.engine.server.on("listening", () => {
        var myLink =
          "http://localhost:" + this.engine.server.address().port + "/";
        resolve(myLink);
      });
    });
  }
}

module.exports = new Peerflix();
