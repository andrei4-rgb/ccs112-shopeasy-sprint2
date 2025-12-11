// Azurin, Ryline C.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    try {
      console.log("🛒 Cart items:", cartItems);

      const payload = {
        name,
        address,
        payment,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity || 1,
          status: "pending",
        })),
      };

      console.log("📦 Sending full order payload:", payload);

      const res = await api.post("/api/orders", payload);

      console.log("✅ Order response:", res.data);

      // ✅ Clear cart only after successful order
      localStorage.removeItem("cart");
      alert("Order placed!");

      setName("");
      setAddress("");
      setPayment("Cash on Delivery");

      nav("/cart");
    } catch (err) {
      console.error("❌ Order error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.items?.[0] ||
        "Failed to place order"
      );
    }
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

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
    </form>
  );
}
