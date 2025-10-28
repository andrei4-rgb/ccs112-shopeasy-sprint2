// Austria, Sheban James, V

import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function ProductList() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "#1F2937", textAlign: "center", marginBottom: 24 }}>Our Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              border: "1px solid #D1D5DB",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 12
              }}
            />
            <h3 style={{ margin: "8px 0", color: "#1F2937" }}>{p.name}</h3>
            <p style={{ margin: "4px 0", color: "#4B5563" }}>₱{p.price}</p>
            <Link to={`/products/${p.id}`}>
              <button
                style={{
                  background: "#EF4444",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

//Artillero - nag add ako mga bagong product