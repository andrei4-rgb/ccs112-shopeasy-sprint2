// Artillero, Lexin Andrei G.

import React, { useEffect, useState } from "react";
import "../index.css";

export default function OrdersView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="product-card admin-card">
            <h3>Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.customer?.name || "N/A"}</p>
            <p><strong>Address:</strong> {order.customer?.address || "N/A"}</p>
            <p><strong>Payment:</strong> {order.customer?.payment || "N/A"}</p>
            <p><strong>Total:</strong> ₱{order.total}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} – ₱{item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <button className="back-button" onClick={() => window.location.href = "/admin"}>
        ⬅ Back to Admin Panel
      </button>
    </div>
  );
}