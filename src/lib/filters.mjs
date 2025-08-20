export function slugify(name){
  return name.toLowerCase().replaceAll(' ', '-');
}
export function matchesQuery(p, q){
  if(!q) return true;
  const hay = (p.name + ' ' + p.brand + ' ' + p.notes.join(' ')).toLowerCase();
  return hay.includes(q.toLowerCase());
}
export function matchesNotes(p, notes){
  if(!notes || notes.length === 0) return true;
  return notes.every(n => p.notes.includes(n));
}
export function filterByTab(items, tab){
  if(tab === 'new') return items.slice(0,3);
  if(tab === 'luxury') return items.filter(p => p.price > 2500);
  if(tab === 'attars') return items.filter(p => p.name.toLowerCase().includes('attar') || p.brand === 'AttarAura');
  return items;
}
export function filterByAll(items, { tab='bestsellers', query='', notes=[] } = {}){
  let out = items.filter(p => matchesQuery(p, query) && matchesNotes(p, notes));
  out = filterByTab(out, tab);
  return out;
}
