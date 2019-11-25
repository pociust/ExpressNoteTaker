const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const notes = [
  {
    title: "first note",
    text: "typing my first note"
  },
  {
    title: "get groceries",
    text: "get eggs, milk, cheese"
  }
];

//sets up the experss app to handle data parsing
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  notes.push(req.body);
  res.json(true);
  console.log(req.body);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
