// routes.js, callback function for createServer, listens to the incoming routes and handles accordingly
// import the core module fs, granting us access to the local filesystem for read/write/etc
const fs = require("fs");

const requestHandler = (req, res) => {
  //   console.log(
  //     `url is ${req.url}, method is ${req.method}, and headers are`,
  //     req.headers
  //   );
  // process.exit(); // 4 End the Event Loop process, effectively shutting down the server
  // 5 We can listen to requests and return specific html according to the request data
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
  // 9 if the user accesses /message with a POST method, lets redirect the user back to '/' and create a new file.
  if (url === "/message" && method === "POST") {
    const body = [];
    // 14 .on() is registering an event listener, we are listening for the 'data' event to fire whenever a new chunk can be read, and the second arg is a function to be executed on every incoming data piece
    req.on("data", (chunk) => {
      //   console.log(chunk); // 15 outputs `<Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f>` this is what one chunk looks like
      body.push(chunk);
    });
    // 16 again we are listening for an event, in this case the end event, which fires after all the data events have finished. We return in the following so not to run the default response outside of this if block
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // 17 Buffer object made available globally to nodeJS. This is where the "bus stops" in the stream and we can interact with the data.
      const message = parsedBody.split("=")[1]; // 18 now we need only the part of the request that holds the data, so we split the parsedBody value on the equal sign, thus giving us ['message', 'hello'] and then we use bracket notation to access the appropriate index.
      // fs.writeFileSync("message.txt", message); // 12 creating a new file with parsed data from the incoming request. This must be called in the .on() event listener because .on() us asychronous and is registered to run when the event is triggered, not sychronously (this is why we do not call the write file outside of the on listener). Also message is in the scope of on only anyway.
      // 19 writeFileSync means sychronous file writing, therefore this line of code is blocking, and the code execution waits until this file is fully written before continuing the remaining operations - this is useful only if you need to then utilize the file that was created, otherwise it can slow down operations unnecessarily. Instead, .writeFile accepts a name, content, and a callback. We can move the response code into the callback because it is ultimately what we want to execute once we are done writing the file.
      fs.writeFile("message.txt", message, (err) => {
        // 20 if we do something in the event listener that would influence the response, the response should then be moved into the event listener as such
        res.statusCode = 302; // 10 redirect
        res.setHeader("Location", "/"); // 11 setting a default header of the browser.
        return res.end(); // 13 end the response, return to "exit"
      });
    });
  }
  res.setHeader("Content-Type", "text/html"); // 6 our response is mostly empty, so we have to provide the response ourselves. One for instance is setHeader.
  // 7 We said we were going to respond with html but we have not yet provided it yet, so lets do that. the following is a very tedious static and unoptimal way to do that, but it is a way none the less.
  res.write("<html>");
  res.write("<head><title>My First Server Response</title></head>");
  res.write("<body><h1>Hello from my new server</h1></body>");
  res.write("</html>");
  // 8 We must indicate we are done writing our response, and we do so with .end()
  res.end();
};

// 21 let's move routes into its own file, and therefore export and import accordingly
// module.exports = requestHandler;

// 24 alternative to exporting if you need to export multiple things
// module.exports = {
//   handler: requestHandler,
//   someText: "Hello",
// };

//25 another alternative. Note, this is still just one export, nodeJS bundles it all together
// module.exports.handler = requestHandler;
// module.exports.someText = "Hello again";

//26 lastly, we can omit module and simply write exports
exports.handler = requestHandler;
exports.someText = "Hello hello hello";
