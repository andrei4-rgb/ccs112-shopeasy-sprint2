// Austria, Sheban James

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import products from "../data/products.json"; // remove local data import
import api from "../api/axios";
import "../index.css";

const categories = ["All", "Apparel", "Accessories", "Utilities"];

export default function ProductList() {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

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

  useEffect(() => {
    // Load from API
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load products")
      );
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => {
          // Adjust if backend returns category as object
          // e.g., p.category?.name === selectedCategory
          return p.category === selectedCategory || p.category_name === selectedCategory;
        });

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

      {error && <p style={{ color: "red" }}>{error}</p>}

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
            {/* If backend doesn’t have image field, guard it */}
            {p.image && <img src={p.image} alt={p.name} />}
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
