// src/app/layout.jsx (Server Component, no 'use client')
import './globals.css';
import ClientProviders from './providers/ClientProviders.jsx';

export const metadata = {
  title: 'AttarAura — Fragrances for every story',
  description: 'India-focused perfume & attar store — UPI, COD, fast shipping.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
