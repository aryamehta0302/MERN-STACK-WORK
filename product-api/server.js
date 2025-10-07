const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/productDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// 🧰 Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save in uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

// 📥 API to upload image
app.post("/api/upload", upload.single("image"), (req, res) => {
  const imagePath = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl: imagePath });
});

// ✅ CRUD Routes

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  let { name, price, description, image } = req.body;
  if (!image) image = "https://via.placeholder.com/300x200?text=No+Image";
  const newProduct = new Product({ name, price, description, image });
  await newProduct.save();
  res.json({ message: "Product created", product: newProduct });
});

app.put("/api/products/:id", async (req, res) => {
  const { name, price, description, image } = req.body;
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, description, image },
    { new: true }
  );
  res.json({ message: "Product updated", product: updated });
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
