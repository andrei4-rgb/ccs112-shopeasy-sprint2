//Austria, Sheban James, V
// tiny fix to trigger new commit


import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function ProductList(){
  return (
    <div style={{padding:16}}>
      <h2 style={{color:"#1F2937"}}>Products</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:12}}>
        {products.map(p => (
          <div key={p.id} style={{background:"#fff", border:"1px solid #D1D5DB", borderRadius:8, padding:12, textAlign:"center"}}>
            <div style={{height:120, background:"#E5E7EB", borderRadius:8, marginBottom:8}}></div>
            <h3 style={{margin:0}}>{p.name}</h3>
            <p style={{margin:"8px 0"}}>₱{p.price}</p>
            <Link to={`/products/${p.id}`}>
              <button style={{background:"#EF4444", color:"#fff", border:"none", padding:"8px 16px", borderRadius:8}}>View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}