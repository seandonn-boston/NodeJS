const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write("<html><title>Sec3 Asgmt Home</title></html>");
    res.write("<body>");
    res.write("<h1>Create a user</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Create User</button></form>"
    );
    res.write("</body>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html><title>Sec3 Asgmt Users</title></html>");
    res.write(
      "<body><h1>Users</h1><ul><li>User 1</li><li>User 2</li></ul></body>"
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
  res.write("<html><title>Sec3 Asgmt Page Not Found</title></html>");
  res.write("<body><h1>Page Not Found</h1></body>");
  return res.end();
};

exports.handler = requestHandler;
