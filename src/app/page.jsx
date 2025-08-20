'use client';
import React, { useMemo, useState } from 'react';
import products from '@/data/products.json';
import { filterByAll, slugify } from '@/lib/filters.mjs';
import { useCart } from './context/CartContext.jsx';
import CartDrawer from './components/CartDrawer.jsx';

const NOTES = ['rose','oud','jasmine','vanilla','musk','saffron','cardamom','citrus'];

export default function HomePage(){
  const { addToCart, setDrawerOpen } = useCart();
  const [tab, setTab] = useState('bestsellers');
  const [query, setQuery] = useState('');
  const [noteFilters, setNoteFilters] = useState([]);

  const filtered = useMemo(() => filterByAll(products, { tab, query, notes: noteFilters }), [tab, query, noteFilters]);

  function toggleNote(n){
    setNoteFilters(prev => prev.includes(n) ? prev.filter(x => x!==n) : [...prev, n]);
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(to bottom,#fff1f2,#ffffff,#fffbeb)',color:'#0f172a'}}>
      <CartDrawer/>

      <div style={{background:'#000',color:'#fff',fontSize:12,padding:'6px 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}>
            <div>🚚 Free delivery over ₹999 | 2–5 day metro shipping</div>
            <div style={{opacity:.9}}>🎁 Gift wrap + handwritten note · EN / हिन्दी</div>
          </div>
        </div>
      </div>

      <header style={{position:'sticky',top:0,background:'rgba(255,255,255,.85)',backdropFilter:'blur(8px)',borderBottom:'1px solid #e2e8f0',zIndex:40}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px',display:'flex',alignItems:'center',gap:12,paddingTop:12,paddingBottom:12}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'ui-serif,Georgia,serif',fontSize:24}}>✨ AttarAura</div>
          <div style={{marginLeft:'auto',maxWidth:420,width:'100%'}}>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by brand, note, mood…" style={{width:'100%',padding:'10px 12px',border:'1px solid #e2e8f0',borderRadius:999}}/>
          </div>
          <button onClick={()=>setDrawerOpen(true)} style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e2e8f0',background:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'}}>🛍️ Cart</button>
        </div>
      </header>

      <section style={{padding:'32px 0 8px'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px',display:'grid',gap:16}}>
          <div>
            <span style={{display:'inline-flex',alignItems:'center',gap:6,borderRadius:999,padding:'4px 10px',fontSize:12,background:'#e11d48',border:'1px solid #e11d48',color:'#fff'}}>Festive Edit</span>
            <h1 style={{fontFamily:'ui-serif,Georgia,serif',fontSize:40,lineHeight:1.2}}>Fragrances for every story.<br/>Made for India.</h1>
            <p style={{color:'#64748b',fontSize:18}}>Discover bestsellers, niche attars, and modern EDPs. Easy returns, COD & UPI.</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
              <button style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e11d48',background:'#e11d48',color:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'}}>Shop Bestsellers</button>
              <button style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e2e8f0',background:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'}}>Try Travel Sizes</button>
            </div>
          </div>
          <div style={{borderRadius:24,overflow:'hidden',background:'linear-gradient(to bottom right,#ffe4e6,#fff,#fef3c7)',boxShadow:'0 8px 24px rgba(0,0,0,.08)'}}>
            <img src="https://picsum.photos/seed/hero-perfume/900/1200" alt="hero" style={{width:'100%',height:'100%',objectFit:'cover',mixBlendMode:'multiply'}}/>
          </div>
        </div>
      </section>

      <section>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,color:'#64748b'}}>Filter by notes</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {NOTES.map(n => {
                const active = noteFilters.includes(n);
                const base = {display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e2e8f0',background:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'};
                const act = {background:'#111827',color:'#fff',borderColor:'#111827'};
                return <button key={n} onClick={()=>toggleNote(n)} style={{...base, ...(active?act:null)}}>{n}</button>
              })}
              {noteFilters.length>0 && <button onClick={()=>setNoteFilters([])} style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e2e8f0',background:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'}}>Clear</button>}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px'}}>
          <div style={{display:'inline-flex',border:'1px solid #e2e8f0',borderRadius:10,background:'#fff',padding:4}}>
            {['bestsellers','new','luxury','attars'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{border:0,background: tab===t?'#e11d48':'transparent', color: tab===t?'#fff':'#000', padding:'8px 12px',borderRadius:8, cursor:'pointer'}}>
                {t[0].toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>

          <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',padding:'16px 0'}}>
            {filtered.map(p => (
              <div key={p.id} style={{border:'1px solid #e2e8f0',borderRadius:16,background:'#fff'}}>
                <div style={{position:'relative'}}>
                  <img src={p.image} alt={p.name} style={{width:'100%',height:220,objectFit:'cover'}}/>
                  <div style={{position:'absolute',left:10,top:10,display:'flex',gap:8}}>
                    {p.tag && <span style={{display:'inline-flex',alignItems:'center',gap:6,borderRadius:999,padding:'4px 10px',fontSize:12,background:'#000',border:'1px solid #000',color:'#fff'}}>{p.tag}</span>}
                    <span style={{display:'inline-flex',alignItems:'center',gap:6,borderRadius:999,padding:'4px 10px',fontSize:12,background:'#fff',border:'1px solid #e2e8f0',color:'#000'}}>{p.longevity}</span>
                  </div>
                </div>
                <div style={{padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
                    <div>
                      <div style={{color:'#64748b',fontSize:12,textTransform:'uppercase',letterSpacing:'.08em'}}>{p.brand}</div>
                      <div style={{fontWeight:600}}>{p.name}</div>
                    </div>
                    <div style={{textAlign:'right',fontWeight:700}}>₹ {p.price}</div>
                  </div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:6}}>
                    {p.notes.slice(0,3).map(n => <span key={n} style={{border:'1px solid #e2e8f0',borderRadius:999,padding:'4px 8px',fontSize:12}}>{n}</span>)}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                    <button onClick={()=>addToCart(p,1)} style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid #e11d48',background:'#e11d48',color:'#fff',borderRadius:999,padding:'8px 14px',cursor:'pointer'}}>Add to Cart</button>
                    <a href={`/product/${encodeURIComponent(slugify(p.name))}`} style={{color:'#e11d48'}}>View details →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length===0 && <div style={{textAlign:'center',color:'#64748b',padding:32}}>No matches. Try removing a note filter.</div>}
        </div>
      </section>

      <footer style={{padding:'32px 0'}}>
        <div style={{maxWidth:1120,margin:'0 auto',padding:'0 16px',color:'#64748b',fontSize:12, textAlign:'center'}}>© {new Date().getFullYear()} AttarAura. All rights reserved.</div>
      </footer>
    </div>
  );
}
