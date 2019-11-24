const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//sets up the experss app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
