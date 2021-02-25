// app.js, spins up a server when run in node. sometimes also names server.js
// 1 import the core module http, use the require keyword as provided by NodeJS
// 34 deprecated the http require thanks to express's app.listen
// const http = require("http");

// 22 import routes
// 27 deprecated in favor of express.js
// const routes = require("./routes");

// 28 import express
const express = require("express");

// 29 create an express application by running express as a function.
const app = express();

// 31 inserting middleware thanks to express. req and res are pretty much the same as we already know but with some added bells and whistles, and next is a function which allows you to pass the req to the next function essentially
// app.use((req, res, next) => {
//   console.log("In the middleware");
// 32 we must call next() to allow the request to continue onto the next middleware in line
//   next();
// });

// 38 an unexpected behavior is the console logging twice - this is actually expected though unexplained. It is due to the favicon request which comes in at '/favicon.ico' which is a separate request from any other (i.e. localhost:3000/) and it will reload with every page request. Just something to keep in mind
app.use("/favicon.ico", (req, res, next) => {
  console.log("favicon");
});

// 37 if we have middleware we want to run on everything, or several specific things, we call it above the other middlewares with an appropriate path if necessary and then we will call next() to continue the request:
app.use("/", (req, res, next) => {
  console.log("This middleware always runs");
  next();
});

// 36 to define other paths, do so in descending specificitiy, and don't call next to avoid any remaining middlewares that would match
app.use("/add-product", (req, res, next) => {
  console.log("In add-product middleware");
  res.send("<h1>Add product page</h1>");
});

// 35, to listen for specific routes, include a the option path argument before the other arguments (note, '/' is the default). However, if we were to define '/' and go to '/users' we will still hit this middleware because we are not looking for an exact path but that it has to start with our path.
app.use("/", (req, res, next) => {
  console.log("In another middleware"); // 32 con't
  // 33 sending a response, express has no default so we must do it ourselves. We do so with .send() which we can use to send some raw html. If we run this, we will see that the content-type in the network tab of the browser inspector is automatically set to text/html because express did so automatically. you can still do so manually as well.
  //   res.setHeader();
  res.send("<h1>Hello from express</h1>");
});

// 2 createServer method takes a request listener - a function that will trigger with every request, and takes two arguments: the request and the response. createServer returns Server as a variable, so we will store the server in a new variable
// 23 replace the callback with the routes import
// 24, 25, 26
// 27 no more access to routes.handler in favor of express
// const server = http.createServer(routes.handler);
// 30 app happens to be a valid request handler thanks to express
// const server = http.createServer(app);

// 3 Server will have a built in function called listen. listen will start the process where NodeJS will keep the server running to listen for incoming requests. args are the port to listen on, and a hostname
// server.listen(3000);

// 34 rather than http.createServer and server.listen, we can simply call app.listen thanks to express
app.listen(3000);
