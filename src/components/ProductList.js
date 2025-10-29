//Austria, Sheban James

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../index.css";

const categories = ["All", "Apparel", "Accessories", "Utilities"];

export default function ProductList() {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setExpandedId(null);
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="page-container">
      <h2 style={{ color: "#1F2937", textAlign: "center", marginBottom: 12 }}>
        Our Products
      </h2>

      <div className="category-selector">
        <button
          className="category-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Category: {selectedCategory}
        </button>

        {dropdownOpen && (
          <div className="category-dropdown">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-option ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDropdownOpen(false);
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.map((p) => (
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

      {expandedId && (
        <div className="overlay" onClick={() => setExpandedId(null)}></div>
      )}
    </div>
  );
}