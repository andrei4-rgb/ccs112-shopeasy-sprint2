// Landing.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Welcome to ShopEasy</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <button
          onClick={() => navigate("/login?mode=user")}
          style={{ padding: "1rem 2rem", fontSize: "1.2rem", backgroundColor: "#1F2937", color: "white", border: "none", borderRadius: "8px" }}
        >
          User Mode
        </button>
        <button
          onClick={() => navigate("/login?mode=admin")}
          style={{ padding: "1rem 2rem", fontSize: "1.2rem", backgroundColor: "red", color: "white", border: "none", borderRadius: "8px" }}
        >
          Admin Mode
        </button>
      </div>
    </div>
  );
}
