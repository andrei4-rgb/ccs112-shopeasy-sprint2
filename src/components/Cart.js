//Azurin, Ryline C.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [items, setItems] = useState([]);
  const nav = useNavigate();
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem("cart")||"[]")); },[]);
  const total = items.reduce((sum,i)=>sum + (i.price || 0), 0);
  return (
    <div style={{padding:16}}>
      <h2 style={{color:"#1F2937"}}>Your Cart</h2>
      {items.length===0 ? <p>No items.</p> :
        items.map((it, idx)=>(
          <div key={idx} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #E5E7EB"}}>
            <span>{it.name}</span>
            <span>₱{it.price}</span>
          </div>
        ))
      }
      <h3>Total: ₱{total}</h3>
      <button
  onClick={() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
    };

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
    localStorage.removeItem("cart"); // clear cart after checkout
    nav("/checkout");
  }}
  style={{
    background: "#EF4444",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 8
  }}
>
  Checkout
</button>
    </div>
  );
}