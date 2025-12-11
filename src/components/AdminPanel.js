// AdminPanel.js
// Artillero, Lexin Andrei G.

import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "../index.css";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // ✅ new state for orders
  const [showOrders, setShowOrders] = useState(false); // ✅ toggle between products and orders

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  // Load products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.response?.data || err.message);
        alert("Failed to load products. Check console for details.");
      }
    };
    loadProducts();
  }, []);

  // Load orders from backend
  const loadOrders = async () => {
    try {
      const res = await api.get("/api/admin/orders"); // ✅ admin route
      setOrders(res.data);
      setShowOrders(true);
    } catch (err) {
      console.error("Failed to fetch orders:", err.response?.data || err.message);
      alert("Failed to load orders. Check console for details.");
    }
  };

  // Add product
  const handleAdd = async () => {
    try {
      console.log("Sending new product:", newProduct);
      const res = await api.post("/api/products", newProduct);
      console.log("Product added:", res.data);
      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "", description: "", image: "", category: "" });
      alert("Product added successfully!");
    } catch (err) {
      console.error("Failed to add product:", err.response?.data || err.message);
      alert("Failed to add product. Check console for details.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product:", err.response?.data || err.message);
      alert("Failed to delete product. Check console for details.");
    }
  };

  // Edit product
  const handleEdit = async (id, field, value) => {
    try {
      const updated = products.find((p) => p.id === id);
      const newData = { ...updated, [field]: value };
      const res = await api.put(`/api/products/${id}`, newData);
      setProducts(products.map((p) => (p.id === id ? res.data : p)));
      console.log("Product updated:", res.data);
    } catch (err) {
      console.error("Failed to update product:", err.response?.data || err.message);
      alert("Failed to update product. Check console for details.");
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel</h2>
        <div className="admin-actions">
          <button className="back-button" onClick={() => (window.location.href = "/")}>
            ⬅ Back to User Mode
          </button>
          <button className="view-orders-button" onClick={loadOrders}>
            👁 View Orders
          </button>
        </div>
      </div>

      {/* Toggle view */}
      {showOrders ? (
        <div className="orders-list">
          <h3>Customer Orders</h3>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="order-card">
                <p><strong>Order ID:</strong> {o.id}</p>
                <p><strong>User:</strong> {o.user?.email}</p>
                <p><strong>Name:</strong> {o.name}</p>
                <p><strong>Address:</strong> {o.address}</p>
                <p><strong>Payment:</strong> {o.payment}</p>
                <p><strong>Status:</strong> {o.status}</p>
                <p><strong>Total:</strong> ₱{o.total_price}</p>
                <p><strong>Product:</strong> {o.product?.name}</p>
              </div>
            ))
          )}
          <button onClick={() => setShowOrders(false)}>⬅ Back to Products</button>
        </div>
      ) : (
        <>
          {/* Add product form */}
          <div className="admin-form">
            <input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || "" })}
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
        </>
      )}
    </div>
  );
}
