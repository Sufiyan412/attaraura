// src/app/providers/ClientProviders.jsx
'use client';

import { CartProvider } from '../context/CartContext.jsx';

export default function ClientProviders({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
