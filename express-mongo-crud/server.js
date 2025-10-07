const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const User = require("./models/User");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ✅ Connect MongoDB (using your local Compass setup)
mongoose
  .connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// 🏠 READ: List all users
app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("index", { users });
});

// ➕ CREATE: Show form
app.get("/new", (req, res) => {
  res.render("new");
});

// 📝 CREATE: Add user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  await User.create({ name, email });
  res.redirect("/");
});

// ✏️ UPDATE: Show edit form
app.get("/edit/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("edit", { user });
});

// 🔁 UPDATE: Save edited user
app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email });
  res.redirect("/");
});

// 🗑️ DELETE: Remove user
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
