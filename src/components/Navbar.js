import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Hide navbar on landing or login page
  const hideNavbar =
    location.pathname === "/" || location.pathname.startsWith("/login");
  if (hideNavbar) return null;

  return (
    <nav>
      <div className="logo">ShopEasy</div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {user && (
          <>
            <span style={{ marginRight: "1rem" }}>
              {user.email} ({user.role})
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/"); // back to landing after logout
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
