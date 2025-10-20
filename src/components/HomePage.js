//ABAD, JOHN ALREI

import React from "react";
import { Link } from "react-router-dom";

export default function HomePage(){
  return (
    <div style={{padding:16, textAlign:"center"}}>
      <h1 style={{fontSize:24, color:"#1F2937"}}>Welcome to ShopEasy</h1>
      <p style={{color:"#6B7280"}}>Simple e-commerce prototype for CCS112</p>
      <Link to="/products">
        <button style={{background:"#EF4444", color:"#fff", padding:"12px 24px", border:"none", borderRadius:8}}>Shop Now</button>
      </Link>
    </div>
  );
}