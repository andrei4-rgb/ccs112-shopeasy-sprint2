// Azurin, Ryline C.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      customer: { name, address, payment },
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    localStorage.removeItem("cart");

    alert("Order placed!");

    // Clear form inputs
    setName("");
    setAddress("");
    setPayment("Cash on Delivery");

    // Optional: redirect to cart or thank you page
    nav("/cart");
  };

  return (
    <form onSubmit={submit} style={{ padding: 16 }}>
      <h2 style={{ color: "#1F2937" }}>Checkout</h2>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #D1D5DB"
          }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #D1D5DB"
          }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #D1D5DB"
          }}
        >
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          background: "#EF4444",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 8
        }}
      >
        Place Order
      </button>
    </form>
  );
}
