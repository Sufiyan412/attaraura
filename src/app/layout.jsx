'use client';
import { CartProvider } from './context/CartContext.jsx';

export const metadata = {
  title: 'AttarAura — Fragrances for every story',
  description: 'India-focused perfume & attar store — UPI, COD, fast shipping.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body style={{margin:0,fontFamily:'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial'}}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
