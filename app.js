// import the core module http, use the require keyword as provided by NodeJS
const http = require("http");
// import the core module fs, granting us access to the local filesystem for read/write/etc
const fs = require("fs");

// createServer method takes a request listener - a function that will trigger with every request, and takes two arguments: the request and the response. createServer returns Server as a variable, so we will store the server in a new variable
const server = http.createServer((req, res) => {
  //   console.log(
  //     `url is ${req.url}, method is ${req.method}, and headers are`,
  //     req.headers
  //   );
  // process.exit(); // End the Event Loop process, effectively shutting down the server
  // We can listen to requests and return specific html according to the request data
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  // if the user accesses /message with a POST method, lets redirect the user back to '/' and create a new file.
  if (url === "/message" && method === "POST") {
    const body = [];
    // .on() is registering an event listener, we are listening for the 'data' event to fire whenever a new chunk can be read, and the second arg is a function to be executed on every incoming data piece
    req.on("data", (chunk) => {
      console.log(chunk); // outputs `<Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f>` this is what one chunk looks like
      body.push(chunk);
    });
    // again we are listening for an event, in this case the end event, which fires after all the data events have finished
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // Buffer object made available globally to nodeJS. This is where the "bus stops" in the stream and we can interact with the data.
      const message = parsedBody.split("=")[1]; // now we need only the part of the request that holds the data, so we split the parsedBody value on the equal sign, thus gioving us ['message', 'hello'] and then we use bracket notation to access the appropriate index.
      fs.writeFileSync("message.txt", message); // creating a new file with parsed data from the incoming request. This must be called in the .on() event listener because .on() us asychronous and is registered to run when the event is triggered, not sychronously (this is why we do not call the write file outside of the on listener). Also message is in the scope of on only anyway.
    });
    res.statusCode = 302; // redirect
    res.setHeader("Location", "/"); // setting a default header of the browser.
    return res.end();
  }
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
