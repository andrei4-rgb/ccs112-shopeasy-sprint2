// Azurin, Ryline C.

import React from "react";

export default function Checkout(){
  const submit = e => {
    e.preventDefault();
    alert("Order placed!");
    localStorage.removeItem("cart");
  };
  return (
    <form onSubmit={submit} style={{padding:16}}>
      <h2 style={{color:"#1F2937"}}>Checkout</h2>
      <div style={{marginBottom:8}}><input placeholder="Name" required style={{width:"100%", padding:12, borderRadius:8, border:"1px solid #D1D5DB"}}/></div>
      <div style={{marginBottom:8}}><input placeholder="Address" required style={{width:"100%", padding:12, borderRadius:8, border:"1px solid #D1D5DB"}}/></div>
      <div style={{marginBottom:8}}>
        <select style={{width:"100%", padding:12, borderRadius:8, border:"1px solid #D1D5DB"}}>
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
        </select>
      </div>
      <button type="submit" style={{background:"#EF4444", color:"#fff", border:"none", padding:"12px 24px", borderRadius:8}}>Place Order</button>
    </form>
  );
}