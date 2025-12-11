// Austria, Sheban James
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../index.css";

const categories = ["All", "Apparel", "Accessories", "Utilities"];

export default function ProductList() {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Escape key handler
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

  // Load products from API
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load products")
      );
  }, []);

  // Filter by category (case-insensitive)
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => {
          const category = p.category || "";
          return category.toLowerCase() === selectedCategory.toLowerCase();
        });

  return (
    <div className="page-container">
      <h2 style={{ color: "#1F2937", textAlign: "center", marginBottom: 12 }}>
        Our Products
      </h2>

      {/* Category selector */}
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

      {/* Product grid */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className={`product-card ${
              expandedId === p.id ? "expanded" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedId(expandedId === p.id ? null : p.id);
            }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: expandedId === p.id ? "auto" : "200px",
                  maxHeight: expandedId === p.id ? "80vh" : "200px",
                  objectFit: expandedId === p.id ? "contain" : "cover",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
            )}
            <h3>{p.name}</h3>

            {/* Price + View button aligned side by side */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <p style={{ margin: 0 }}>₱{p.price}</p>
              <Link to={`/products/${p.id}`}>
                <button>View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {expandedId && (
        <div className="overlay" onClick={() => setExpandedId(null)}></div>
      )}
    </div>
  );

}
