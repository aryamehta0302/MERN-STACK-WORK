const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// 🏠 GET route - show form
app.get("/", (req, res) => {
  res.render("index");
});

// 📤 POST route - handle form submission
app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const sum = num1 + num2;

  res.render("result", { num1, num2, sum });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
