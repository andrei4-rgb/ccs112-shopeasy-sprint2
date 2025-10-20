//ABAD, JOHN ALREI

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav style={{background:"#FFFFFF", borderBottom:"1px solid #D1D5DB", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div style={{fontWeight:600, color:"#1F2937"}}>ShopEasy</div>
      <div style={{display:"flex", gap:24}}>
        <Link to="/" style={{color:"#1F2937", textDecoration:"none"}}>Home</Link>
        <Link to="/products" style={{color:"#1F2937", textDecoration:"none"}}>Products</Link>
        <Link to="/cart" style={{color:"#1F2937", textDecoration:"none"}}>Cart</Link>
      </div>
    </nav>
  );
}