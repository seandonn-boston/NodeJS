const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write("<html>");
    res.write("<title>Sec3 Asgmt Home</title>");
    res.write("</html>");
    res.write("<body>");
    res.write("<h1>Create a user</h1>");
    res.write("<form action='/create-user' method='POST'>");
    res.write("<input type='text' name='username'>");
    res.write("<button type='submit'>Create User</button>");
    res.write("</form>");
    res.write("</body>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<title>Sec3 Asgmt Users</title>");
    res.write("</html>");
    res.write("<body>");
    res.write("<h1>Users</h1>");
    res.write("<ul>");
    res.write("<li>User 1</li>");
    res.write("<li>User 2</li>");
    res.write("</ul>");
    res.write("</body>");
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
