// ABAD, JOHN ALREI

import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "../index.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate(); 

  return (
    <nav>
      <div className="logo">ShopEasy</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {/* Three dots menu for mode switching */}
        <div className="mode-switch">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
          {dropdownOpen && (
            <div className="mode-dropdown">
              <div onClick={() => { navigate("/"); setDropdownOpen(false); }}>
                User Mode
              </div>
              <div onClick={() => { navigate("/admin"); setDropdownOpen(false); }}>
                Admin Mode
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

//Added new on navbar connected to AdminPanel --Team Leader