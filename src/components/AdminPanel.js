// Artillero, Lexin Andrei G.

import React, { useState, useEffect } from "react";
import productsData from "../data/products.json";
import "../index.css";

export default function AdminPanel() {
  // Load products from localStorage if available
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : productsData;
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  // Persist products whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAdd = () => {
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: "", description: "", image: "", category: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="admin-container">
      {/* Header with navigation buttons */}
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel</h2>
        <div className="admin-actions">
          <button
            className="back-button"
            onClick={() => (window.location.href = "/")}
          >
            ⬅ Back to User Mode
          </button>
          <button
            className="view-orders-button"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            👁 View Orders
          </button>
        </div>
      </div>

      {/* Add product form */}
      <div className="admin-form">
        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add Product</button>
      </div>

      {/* Product list */}
      <div className="product-grid admin-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card admin-card">
            <img src={p.image} alt={p.name} />
            <h3
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit(p.id, "name", e.target.innerText)}
            >
              {p.name}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit(p.id, "price", e.target.innerText)}
            >
              ₱{p.price}
            </p>
            <p>{p.category}</p>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
