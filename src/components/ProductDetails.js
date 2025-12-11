import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    loadProduct();
  }, [id]);

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
