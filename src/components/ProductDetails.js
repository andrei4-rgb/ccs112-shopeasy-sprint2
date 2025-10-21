<<<<<<< HEAD
=======
//Austria, Sheban James, V
// tiny fix to trigger new commit


import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetails(){
  const { id } = useParams();
  const nav = useNavigate();
  const product = products.find(p => String(p.id) === id);
  if(!product) return <div style={{padding:16}}>Product not found</div>;
  return (
    <div style={{padding:16}}>
      <button onClick={()=>nav(-1)}>Back</button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₱{product.price}</p>
      <button onClick={()=>{
        const cart = JSON.parse(localStorage.getItem("cart")||"[]");
        cart.push({...product, qty:1});
        localStorage.setItem("cart", JSON.stringify(cart));
        nav("/cart");
      }} style={{background:"#EF4444", color:"#fff", border:"none", padding:"8px 16px", borderRadius:8}}>Add to Cart</button>
    </div>
  );
}
>>>>>>> origin/austria-product-pages-fix
