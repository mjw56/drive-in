const express = require("express");
const routes = require("./routes");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, "build")));
app
  .get("/movies/:page?", routes.movies)
  .get("/search/:term?", routes.searchTerm)
  .get("/stream/:magnet?", routes.searchMagnet);
app.listen(app.get("port"), () => {
  console.log(`Node server running at http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
