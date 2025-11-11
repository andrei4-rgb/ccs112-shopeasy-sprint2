// Artillero, Lexin Andrei G.

import React from "react";
import "../index.css";

export default function OrdersView() {
  return (
    <div className="admin-container">
      <h2 className="admin-title">Customer Orders</h2>
      <p>No orders yet. This section will show customer purchases once integrated.</p>
      <button className="back-button" onClick={() => window.location.href = "/admin"}>
        ⬅ Back to Admin Panel
      </button>
    </div>
  );
}
