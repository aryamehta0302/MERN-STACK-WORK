// Import Express
const express = require("express");

// Create app
const app = express();

// Define port
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page 🏠");
});

app.get("/about", (req, res) => {
  res.send("This is the About Page ℹ️");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at contact@example.com 📧");
});

// Example POST route
app.post("/data", (req, res) => {
  const data = req.body;
  res.send({ message: "Data received successfully ✅", data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
