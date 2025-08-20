'use client';
import React from 'react';
export default function OrderSuccess(){
  return (
    <div style={{maxWidth:720,margin:'0 auto',padding:'40px 16px',textAlign:'center'}}>
      <h1 style={{fontFamily:'ui-serif,Georgia,serif'}}>Thank you! 🎉</h1>
      <p>Your order has been placed. We’ve sent a confirmation email (mock).</p>
      <a href="/" style={{display:'inline-block',marginTop:16,color:'#e11d48',textDecoration:'underline'}}>Back to Home</a>
    </div>
  );
}
