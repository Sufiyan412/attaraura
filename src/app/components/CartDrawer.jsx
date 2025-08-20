'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer(){
  const { items, removeFromCart, setQty, setDrawerOpen, drawerOpen, summary, coupon, setCoupon } = useCart();
  const [inputCode, setInputCode] = useState(coupon || '');

  return (
    <>
      <div onClick={()=>setDrawerOpen(false)} style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,.35)', transition:'opacity .25s ease',
        opacity: drawerOpen?1:0, pointerEvents: drawerOpen?'auto':'none'
      }}/>
      <aside style={{
        position:'fixed', top:0, right:0, height:'100vh', width:'min(420px, 92vw)',
        background:'#fff', borderLeft:'1px solid #e2e8f0', display:'flex', flexDirection:'column',
        transition:'transform .25s ease', transform: drawerOpen?'translateX(0)':'translateX(105%)', zIndex: 60
      }}>
        <div style={{padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight:700}}>Your Cart</div>
          <button onClick={()=>setDrawerOpen(false)} style={{border:'1px solid #e5e7eb', background:'#fff', borderRadius:8, padding:'6px 10px', cursor:'pointer'}}>✕</button>
        </div>

        <div style={{padding:'0 16px', overflowY:'auto'}}>
          {items.length===0 && <div style={{color:'#64748b',padding:'24px 0'}}>Your cart is empty.</div>}

          {items.map(it => (
            <div key={it.id} style={{display:'flex', gap:12, padding:'12px 0', borderBottom:'1px solid #f1f5f9'}}>
              <img src={it.image} alt={it.name} style={{width:64,height:64,objectFit:'cover',borderRadius:8,background:'#f8fafc'}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{it.name}</div>
                <div style={{color:'#64748b',fontSize:12}}>₹ {it.price}</div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
                  <button onClick={()=>setQty(it.id, it.qty-1)} style={{width:28,height:28,border:'1px solid #e2e8f0',borderRadius:6,background:'#fff',cursor:'pointer'}}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={()=>setQty(it.id, it.qty+1)} style={{width:28,height:28,border:'1px solid #e2e8f0',borderRadius:6,background:'#fff',cursor:'pointer'}}>+</button>
                  <button onClick={()=>removeFromCart(it.id)} style={{background:'transparent', border:0, color:'#e11d48', cursor:'pointer', textDecoration:'underline', marginLeft:'auto'}}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div style={{display:'flex', gap:8, alignItems:'center', marginTop:12}}>
            <input value={inputCode} onChange={(e)=>setInputCode(e.target.value.toUpperCase())} placeholder="Coupon? e.g., FESTIVE10" style={{flex:1, border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 10px'}}/>
            <button onClick={()=>setCoupon(inputCode.trim().toUpperCase())} style={{border:'1px solid #e2e8f0', background:'#fff', borderRadius:10, padding:'8px 12px', cursor:'pointer'}}>Apply</button>
          </div>
          {(coupon && !summary.couponValid) && <div style={{color:'#b91c1c', fontSize:12, marginTop:6}}>Coupon not applicable (check minimum subtotal).</div>}

          <div style={{ borderTop:'1px solid #e2e8f0', marginTop:12, paddingTop:12, marginBottom:8 }}>
            <Row label="Subtotal" value={summary.fmt(summary.subtotal)} />
            <Row label="Shipping" value={summary.shipping===0?'FREE':summary.fmt(summary.shipping)} />
            {summary.discount>0 && <Row label="Discount" value={'- '+summary.fmt(summary.discount)} />}
            <Row label="Total" value={summary.fmt(summary.total)} bold />
          </div>
        </div>

        <div style={{ padding:16, borderTop:'1px solid #e2e8f0' }}>
          <a href="/checkout" style={{display:'block', textAlign:'center', background:'#e11d48', color:'#fff', padding:'12px 14px', borderRadius:10, textDecoration:'none', fontWeight:700}}>
            Proceed to Checkout
          </a>
        </div>
      </aside>
    </>
  );
}

function Row({ label, value, bold }){
  return <div style={{display:'flex',justifyContent:'space-between',margin:'6px 0', fontWeight: bold?700:400}}>
    <div>{label}</div><div>{value}</div>
  </div>;
}
