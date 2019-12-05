const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
let database = [];

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
    database = JSON.parse(data);
    return res.json(database[0].notes);
  });
});

app.post("/api/notes", (req, res) => {
  req.body.id = database[0].lastID++;
  database[0].notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(database), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });

  res.json(true);
});

app.delete("/api/notes/:id", (req, res) => {
  database[0].notes.splice(
    database[0].notes.findIndex(function(i) {
      return i.id === req.params.id;
    }),
    1
  );
  fs.writeFile("./db/db.json", JSON.stringify(database), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });

  res.json(true);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

let init = () => {
  if (fs.existsSync("./db/db.json")) {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      database = JSON.parse(data);
    });
  } else {
    fs.readFile("./db/template.json", (err, data) => {
      if (err) throw err;
      database = JSON.parse(data);
      fs.writeFile("./db/db.json", JSON.stringify(database), "utf8", err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};

init();
