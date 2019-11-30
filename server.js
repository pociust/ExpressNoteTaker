const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
let notes = [];

let noteID = 1;

//sets up the express app to handle data parsing
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
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    return res.json(notes);
  });
});

app.post("/api/notes", (req, res) => {
  console.log("notes", notes);

  req.body.id = noteID++;
  notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });

  res.json(true);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

let getNotes = () => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
  });
};
getNotes();
