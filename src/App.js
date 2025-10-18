import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './pages/AdminPanel';
import sampleProducts from './data/products';

function App() {
  const [products, setProducts] = useState(sampleProducts);
  const [cart, setCart] = useState([]);

  const onAdd = (prod) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === prod.id);
      if (ex) return prev.map(p => p.id === prod.id ? {...p, qty: p.qty + 1} : p);
      return [...prev, {...prod, qty: 1}];
    });
  };

  const onUpdateQty = (id, qty) => {
    setCart(prev => prev.map(it => it.id === id ? {...it, qty: Math.max(1, qty)} : it));
  };

  const onRemove = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const onPlaceOrder = () => {
    alert('Order placed! (demo)');
    setCart([]);
  };

  return (
    <>
      <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList products={products} onAdd={onAdd} />} />
        <Route path="/cart" element={<Cart cartItems={cart} onUpdateQty={onUpdateQty} onRemove={onRemove} />} />
        <Route path="/checkout" element={<Checkout cartItems={cart} onPlaceOrder={onPlaceOrder} />} />
        <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
      </Routes>
    </>
  );
}

export default App;
