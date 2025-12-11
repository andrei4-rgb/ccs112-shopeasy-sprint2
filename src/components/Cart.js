// Azurin, Ryline C.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = items.reduce((sum, i) => sum + (i.price || 0), 0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="page-container" style={{ flex: 1 }}>
        <h2 style={{ color: "#1F2937", marginBottom: "16px" }}>Your Cart</h2>

        {items.length === 0 ? (
          <p>No items.</p>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span>{it.name}</span>
              <span>₱{it.price}</span>
            </div>
          ))
        )}

        <h3 style={{ marginTop: "24px" }}>Total: ₱{total}</h3>

        <button
          onClick={() => {
            // ✅ Just navigate, don’t clear cart here
            nav("/checkout");
          }}
        >
          Checkout
        </button>
      </div>

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} ShopEasy. All rights reserved. |
        <a href="/products"> Products </a>|
        <a href="/cart"> Cart </a>
      </footer>
    </div>
  );
}
