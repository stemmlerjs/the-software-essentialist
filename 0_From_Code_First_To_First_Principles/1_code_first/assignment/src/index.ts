const express = require("express");
const app = express();

// Define a basic route
app.get("/", (req:, res) => {
  res.send("Hello, world!");
});

// Another route
app.get("/about", (req, res) => {
  res.send("About page");
});

const port = 3000; // Choose any available port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
