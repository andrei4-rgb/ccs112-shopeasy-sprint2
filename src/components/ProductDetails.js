// Austria, Sheban James, V

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  if (!product) return <div style={{ padding: 16 }}>Product not found</div>;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <button
        onClick={() => nav(-1)}
        style={{
          background: "#1F2937",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: 6,
          marginBottom: 16
        }}
      >
        Back
      </button>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 16
        }}
      />
      <h2 style={{ color: "#1F2937" }}>{product.name}</h2>
      <p style={{ color: "#4B5563" }}>{product.description}</p>
      <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>₱{product.price}</p>
      <button
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({ ...product, qty: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          nav("/cart");
        }}
        style={{
          background: "#EF4444",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}


//updated