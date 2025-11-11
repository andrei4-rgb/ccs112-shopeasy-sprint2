//Artillero, Lexin Andrei G.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./components/AdminPanel"; // new add 
import "./index.css";

export default function App() {
  return (
    <Router>
      {/* Red top accent bar */}
      <div className="top-bar"></div>

      <Routes>
        {/* User-facing routes with Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="page-container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </div>
            </>
          }
        />

        {/* Admin route without Navbar */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
