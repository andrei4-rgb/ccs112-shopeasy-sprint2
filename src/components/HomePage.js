// ABAD, JOHN ALREI

import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="page-container" style={{ flex: 1, textAlign: "center" }}>
        {/* Hero header */}
        <h1 style={{ fontSize: "2.5rem", color: "#1F2937", marginBottom: "12px" }}>
          Welcome to <span style={{ color: "#EF4444" }}>ShopEasy</span>
        </h1>
        <p style={{ color: "#6B7280", fontSize: "1.2rem", marginBottom: "24px" }}>
          Simple e-commerce prototype for CCS112
        </p>

        {/* CTA button */}
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
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
