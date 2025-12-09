// Artillero, Lexin Andrei G.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./components/AdminPanel";
import OrdersView from "./components/OrdersView";
import Login from "./components/Login";   // <-- add unified login
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="top-bar"></div>

      <Routes>
        {/* User-facing layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Login route for both users and admins */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes without Navbar */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/orders" element={<OrdersView />} />
      </Routes>
    </Router>
  );
}
