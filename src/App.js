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
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGuard from "./components/AdminGuard";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Landing from "./components/Landing"; // <-- new import

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="top-bar"></div>

        <Routes>
          {/* Landing page first */}
          <Route path="/" element={<Landing />} />

          {/* User-facing layout */}
          <Route element={<UserLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Login route for both users and admins */}
          <Route path="/login" element={<Login />} />

          {/* Protected user route */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <div>Account page</div>
              </ProtectedRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminPanel />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminGuard>
                <OrdersView />
              </AdminGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

