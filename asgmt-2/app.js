const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("/users");
  res.send("<h1>Users</>");
});

app.use("/", (req, res, next) => {
  console.log("/");
  res.send("<h1>Home</>");
});

app.listen(3000);
