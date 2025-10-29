// Austria, Sheban James, V

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../index.css"; 

export default function ProductList() {
  const [expandedId, setExpandedId] = useState(null);

  // Handle closing with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="page-container">
      <h2 style={{ color: "#1F2937", textAlign: "center", marginBottom: 24 }}>
        Our Products
      </h2>

      <div className="product-grid">
        {products.map((p) => (
          <div
            key={p.id}
            className={`product-card ${expandedId === p.id ? "expanded" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedId(expandedId === p.id ? null : p.id);
            }}
          >
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₱{p.price}</p>
            <Link to={`/products/${p.id}`}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Dim background when card is expanded */}
      {expandedId && (
        <div
          className="overlay"
          onClick={() => setExpandedId(null)}
        ></div>
      )}
    </div>
  );
}

// Artillero - nag add ako mga bagong product
// Austria - nag update po ako for effects