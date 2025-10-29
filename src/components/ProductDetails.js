// Austria, Sheban James, V

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import "../index.css"; 

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  if (!product) return <div style={{ padding: 16 }}>Product not found</div>;

return (
    <div className="page-container">
      <button
        onClick={() => nav(-1)}
        style={{
          background: "#1F2937",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: 6,
          marginBottom: 24,
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">₱{product.price}</p>
        <button
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            cart.push({ ...product, qty: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            nav("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}



//updated