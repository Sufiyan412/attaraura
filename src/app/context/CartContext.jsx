'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

const COUPONS = {
  FESTIVE10: { type: 'percent', amount: 10, minSubtotal: 0 },
  FREESHIP: { type: 'freeship', amount: 0, minSubtotal: 0 },
  ATTARAURA200: { type: 'flat', amount: 200, minSubtotal: 1499 },
};

const CURRENCY = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_state_v1');
      if (raw) {
        const s = JSON.parse(raw);
        setItems(s.items || []);
        setWishlist(s.wishlist || []);
        setCoupon(s.coupon || '');
      }
    } catch {}
  }, []);

  useEffect(() => {
    const s = JSON.stringify({ items, wishlist, coupon });
    localStorage.setItem('cart_state_v1', s);
  }, [items, wishlist, coupon]);

  function addToCart(prod, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(x => x.id === prod.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + qty };
        return clone;
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty }];
    });
    setDrawerOpen(true);
  }
  function removeFromCart(id) { setItems(prev => prev.filter(x => x.id !== id)); }
  function setQty(id, qty) { setItems(prev => prev.map(x => x.id===id ? { ...x, qty: Math.max(1, qty) } : x)); }
  function toggleWishlist(id) { setWishlist(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev, id]); }
  function clearCart(){ setItems([]); setCoupon(''); }

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const baseShip = subtotal >= 999 ? 0 : 79;
    let discount = 0;
    let ship = baseShip;
    const c = COUPONS[coupon?.toUpperCase()];
    if (c && subtotal >= (c.minSubtotal || 0)) {
      if (c.type === 'percent') discount = Math.round((subtotal * c.amount) / 100);
      if (c.type === 'flat') discount = Math.min(subtotal, c.amount);
      if (c.type === 'freeship') ship = 0;
    }
    const total = Math.max(0, subtotal - discount) + ship;
    return { subtotal, shipping: ship, discount, total, fmt: (n)=>CURRENCY.format(n), couponValid: !!c && subtotal >= (c?.minSubtotal||0) };
  }, [items, coupon]);

  const value = { items, addToCart, removeFromCart, setQty, clearCart, wishlist, toggleWishlist, drawerOpen, setDrawerOpen, coupon, setCoupon, summary };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
