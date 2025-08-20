'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutPage(){
  const { items, summary, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');

  function handleRazorpayTest() {
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Razorpay script not loaded. Check your network.');
      return;
    }
    const options = {
      key: 'rzp_test_1234567890abcdef', // TODO: replace with your test key id
      amount: summary.total * 100,
      currency: 'INR',
      name: 'AttarAura',
      description: 'Test Order',
      image: 'https://picsum.photos/seed/attaraura-logo/100/100',
      prefill: { name, email: 'demo@example.com', contact: phone },
      notes: { address: addr },
      theme: { color: '#e11d48' },
      handler: function (response) {
        console.log('Razorpay success:', response);
        clearCart();
        window.location.href = '/order-success';
      },
      modal: { ondismiss: function(){ console.log('Checkout closed'); } }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'20px 16px'}}>
      <h1 style={{fontFamily:'ui-serif,Georgia,serif'}}>Checkout</h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div>
          <label>Name<br/>
            <input value={name} onChange={e=>setName(e.target.value)} style={input}/>
          </label><br/>
          <label>Phone<br/>
            <input value={phone} onChange={e=>setPhone(e.target.value)} style={input}/>
          </label><br/>
          <label>Address<br/>
            <textarea value={addr} onChange={e=>setAddr(e.target.value)} style={{...input, height:100}}/>
          </label>
        </div>

        <div style={{border:'1px solid #e2e8f0', borderRadius:12, padding:12}}>
          <div style={{fontWeight:700, marginBottom:8}}>Order Summary</div>
          {items.map(it=>(
            <div key={it.id} style={{display:'flex',justifyContent:'space-between',margin:'6px 0'}}>
              <div>{it.name} × {it.qty}</div>
              <div>₹ {it.price * it.qty}</div>
            </div>
          ))}
          <hr/>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
            <span>Subtotal</span><span>{summary.fmt(summary.subtotal)}</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>Shipping</span><span>{summary.shipping===0 ? 'FREE' : summary.fmt(summary.shipping)}</span>
          </div>
          {summary.discount>0 && (
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span>Discount</span><span>- {summary.fmt(summary.discount)}</span>
            </div>
          )}
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:700, marginTop:6}}>
            <span>Total</span><span>{summary.fmt(summary.total)}</span>
          </div>

          <div style={{display:'grid', gap:10, marginTop:12}}>
            <button onClick={handleRazorpayTest} style={primaryBtn}>Pay with Razorpay (Test)</button>
            <a href="/order-success" onClick={()=>clearCart()} style={linkBtn}>Cash on Delivery (mock)</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const input = { width:'100%', padding:'10px', border:'1px solid #e2e8f0', borderRadius:8, margin:'6px 0' };
const primaryBtn = { background:'#e11d48', color:'#fff', border:0, padding:'12px', borderRadius:10, cursor:'pointer', textAlign:'center', fontWeight:700 };
const linkBtn = { color:'#e11d48', textDecoration:'underline', display:'inline-block', textAlign:'center', padding:'8px 0' };
