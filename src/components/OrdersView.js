// Artillero, Lexin Andrei G.

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../index.css";

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [form, setForm] = useState({
    customer_id: 1,
    product_id: 1,
    quantity: 2,
    status: "pending",
  });

  const loadOrders = () => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load orders")
      );
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      await api.post("/orders", form); // requires admin token
      setOk("Order created!");
      loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Customer Orders</h2>

      <form onSubmit={createOrder} className="admin-card" style={{ marginBottom: 16 }}>
        <h3>Create Order</h3>
        <input
          className="input"
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: Number(e.target.value) })}
        />
        <input
          className="input"
          placeholder="Product ID"
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: Number(e.target.value) })}
        />
        <input
          className="input"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
        <select
          className="input"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">pending</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>
        <button className="button" type="submit">Create order</button>
        {ok && <p style={{ color: "green" }}>{ok}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="product-card admin-card">
            <h3>Order #{order.id}</h3>
            <p><strong>Customer ID:</strong> {order.customer_id}</p>
            <p><strong>Product ID:</strong> {order.product_id}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
            {/* If your controller returns related models, show them: */}
            {order.customer && (
              <>
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
              </>
            )}
            {order.product && (
              <>
                <p><strong>Product:</strong> {order.product.name}</p>
                <p><strong>Price:</strong> ₱{order.product.price}</p>
              </>
            )}
          </div>
        ))
      )}

      <button className="back-button" onClick={() => window.location.href = "/admin"}>
        ⬅ Back to Admin Panel
      </button>
    </div>
  );
}
