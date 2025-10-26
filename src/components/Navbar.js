// ABAD, JOHN ALREI

import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; // may binago lang ako onti

export default function Navbar() {
  return (
    <nav>
      <div className="logo">ShopEasy</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}
