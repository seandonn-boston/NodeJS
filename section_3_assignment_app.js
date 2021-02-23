const http = require("http");

const routes = require("./section_3_assignment_routes");

const server = http.createServer(routes.handler);

server.listen(3000);
