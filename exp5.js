const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// GET - Fetch data
app.get("/users", (req, res) => {
    res.send("GET: Fetching all users");
});

// POST - Add new data
app.post("/users", (req, res) => {
    res.send("POST: User added successfully");
});

// PUT - Update data
app.put("/users/:id", (req, res) => {
    res.send(`PUT: User with ID ${req.params.id} updated`);
});

// DELETE - Delete data
app.delete("/users/:id", (req, res) => {
    res.send(`DELETE: User with ID ${req.params.id} deleted`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});