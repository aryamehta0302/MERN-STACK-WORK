import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // 🧠 Fetch all products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📁 Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ☁️ Upload image to backend
  const uploadImage = async () => {
    if (!file) return form.image; // if no file chosen, use URL if available
    const data = new FormData();
    data.append("image", file);
    const res = await axios.post("http://localhost:5000/api/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.imageUrl;
  };

  // 💾 Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const newProduct = { ...form, image: imageUrl };

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
        newProduct
      );
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/products", newProduct);
    }

    setForm({ name: "", price: "", description: "", image: "" });
    setFile(null);
    fetchProducts();
  };

  // ✏️ Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setEditingId(product._id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ❌ Delete product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={pageStyle}>
      <h1>🛍️ Product Management with Image Upload</h1>

      {/* 🧾 Add / Edit Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          style={inputStyle}
        />
        <input type="file" onChange={handleFileChange} style={inputStyle} />

        {/* Live Preview */}
        {(form.image || file) && (
          <div style={previewBox}>
            <img
              src={file ? URL.createObjectURL(file) : form.image}
              alt="Preview"
              style={imageStyle}
            />
          </div>
        )}

        <button style={buttonStyle}>
          {editingId ? "✏️ Update Product" : "➕ Add Product"}
        </button>
      </form>

      {/* 📦 Product Grid */}
      <h2>📦 Products List</h2>
      <div style={gridStyle}>
        {products.map((p) => (
          <div key={p._id} style={cardStyle} className="card">
            <div style={imageBox}>
              <img src={p.image} alt={p.name} style={imageStyle} />
            </div>
            <h3>{p.name}</h3>
            <p style={{ margin: "5px 0" }}>💰 ₹{p.price}</p>
            <p style={{ margin: "5px 0", color: "#666" }}>{p.description}</p>
            <div>
              <button onClick={() => handleEdit(p)} style={editBtn}>
                Edit
              </button>
              <button onClick={() => handleDelete(p._id)} style={deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const pageStyle = {
  padding: "30px",
  fontFamily: "Poppins, Arial, sans-serif",
  backgroundColor: "#f7f8fa",
  minHeight: "100vh",
};

const formStyle = {
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  margin: "5px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  fontSize: "15px",
  transition: "transform 0.2s ease",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "12px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  maxWidth: "320px",
  margin: "0 auto",
};

const imageBox = {
  width: "100%",
  height: "220px",
  overflow: "hidden",
  borderRadius: "12px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
  transition: "transform 0.3s ease",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // 🔥 keeps ratio, fills box
  borderRadius: "12px",
  transition: "transform 0.3s ease",
};

const previewBox = { ...imageBox, marginBottom: "15px" };

const editBtn = {
  background: "#2196F3",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  margin: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

/* Hover Effects (via inline) */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
    });
  });
});

export default App;
