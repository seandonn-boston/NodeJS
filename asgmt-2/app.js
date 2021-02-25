const express = require("express");

const app = express();

app.use("/favicon.ico", (req, res, next) => {
  console.log("favicon");
});

app.use("/users", (req, res, next) => {
  console.log("/users mw");
  res.send("<h1>Users</h1>");
});

app.use("/", (req, res, next) => {
  console.log("/ mw");
  res.send("<h1>Home</h1>");
});

app.listen(3000);
