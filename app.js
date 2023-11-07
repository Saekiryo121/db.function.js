const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "RyoArata0213",
  database: "express_db",
});

app.use(express.static("assets"));

app.post("/", (req, res) => {
  const sql = "INSERT INTO questionnaire SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});


app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "html/form.html"));
});

app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM clients WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", {
      user: result,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
