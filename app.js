// import the core module http, use the require keyword as provided by NodeJS
const http = require("http");

// createServer method takes a request listener - a function that will trigger with every request, and takes two arguments: the request and the response. createServer returns Server as a variable, so we will store the server in a new variable
const server = http.createServer((req, res) => {
  console.log(
    `url is ${req.url}, method is ${req.method}, and headers are`,
    req.headers
  );
  // process.exit(); // End the Event Loop process, effectively shutting down the server
  res.setHeader("Content-Type", "text/html"); // our response is mostly empty, so we have to provide the response ourselves. One for instance is setHeader.
  // We said we were going to respond with html but we have not yet provided it yet, so lets do that. the following is a very tedious static and unoptimal way to do that, but it is a way none the less.
  res.write("<html>");
  res.write("<head><title>My First Server Response</title></head>");
  res.write("<body><h1>Hello from my new server</h1></body>");
  res.write("</html>");
  // We must indicate we are done writing our response, and we do so with .end()
  res.end();
});

// Server will have a built in function called listen. listen will start the process where NodeJS will keep the server running to listen for incoming requests. args are the port to listen on, and a hostname
server.listen(3000);
