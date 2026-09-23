const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("GET: Fetching users");
}

else if (req.method === "POST" && req.url === "/users") {
    res.writeHead(201, { "Content-Type": "text/plain" });
    res.end("POST: Creating a new user");
}

else if (req.method === "PUT" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("PUT: Updating user");
}

else if (req.method === "DELETE" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("DELETE: Deleting user");
}
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});