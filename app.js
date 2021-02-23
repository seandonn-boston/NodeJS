// app.js, spins up a server when run in node. sometimes also names server.js
// 1 import the core module http, use the require keyword as provided by NodeJS
const http = require("http");
// 22 import routes
const routes = require("./routes");

// 2 createServer method takes a request listener - a function that will trigger with every request, and takes two arguments: the request and the response. createServer returns Server as a variable, so we will store the server in a new variable
// 23 replace the callback with the routes import
// 24, 25, 26
const server = http.createServer(routes.handler);

// 3 Server will have a built in function called listen. listen will start the process where NodeJS will keep the server running to listen for incoming requests. args are the port to listen on, and a hostname
server.listen(3000);
