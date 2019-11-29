const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");

let noteID = 1;
const notes = [];

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
    let newNotes = JSON.parse(data);

    console.log("string", newNotes);
    return res.json(newNotes);
  });
});

app.post("/api/notes", (req, res) => {
  req.body.id = noteID++;
  notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
  console.log("notes", notes);

  res.json(true);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
