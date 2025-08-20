import assert from 'node:assert';

function priceSummary(items, coupon) {
  const COUPONS = {
    FESTIVE10: { type: 'percent', amount: 10, minSubtotal: 0 },
    FREESHIP: { type: 'freeship', amount: 0, minSubtotal: 0 },
    ATTARAURA200: { type: 'flat', amount: 200, minSubtotal: 1499 },
  };
  const subtotal = items.reduce((s, it)=> s + it.price*it.qty, 0);
  let shipping = subtotal >= 999 ? 0 : 79;
  let discount = 0;
  const c = COUPONS[coupon];
  if (c && subtotal >= (c.minSubtotal || 0)) {
    if (c.type==='percent') discount = Math.round(subtotal * c.amount / 100);
    if (c.type==='flat') discount = Math.min(subtotal, c.amount);
    if (c.type==='freeship') shipping = 0;
  }
  const total = Math.max(0, subtotal - discount) + shipping;
  return { subtotal, discount, shipping, total };
}

const cartA = [{ price: 1000, qty: 1 }, { price: 600, qty: 1 }];
const cartB = [{ price: 800, qty: 1 }];

let s = priceSummary(cartA, 'FESTIVE10');
assert.equal(s.discount, 160);
assert.equal(s.shipping, 0);
assert.equal(s.total, 1440);

s = priceSummary(cartB, 'FREESHIP');
assert.equal(s.discount, 0);
assert.equal(s.shipping, 0);
assert.equal(s.total, 800);

s = priceSummary(cartA, 'ATTARAURA200');
assert.equal(s.discount, 200);
assert.equal(s.shipping, 0);
assert.equal(s.total, 1400);

console.log('✅ coupon tests passed');
