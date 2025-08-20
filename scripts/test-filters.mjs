import items from '../src/data/products.json' assert { type: 'json' };
import { matchesQuery, matchesNotes, filterByTab, filterByAll } from '../src/lib/filters.mjs';

function assert(cond, msg){ if(!cond){ console.error('❌', msg); process.exitCode = 1; } else { console.log('✅', msg); } }

assert(matchesQuery(items[0], 'monsoon'), 'Query should match by name');
assert(matchesQuery(items[2], 'rose'), 'Query should match by note');
assert(!matchesQuery(items[2], 'banana'), 'Query should not match unrelated word');

assert(matchesNotes(items[2], ['rose']), 'Notes filter should include rose items');
assert(!matchesNotes(items[2], ['rose','oud']), 'Notes filter should require all notes');

const luxury = filterByTab(items, 'luxury');
assert(luxury.length === 2, 'Luxury tab should return 2 items (price > 2500)');

const att = filterByTab(items, 'attars');
assert(att.length === 1 || att.length === 2, 'Attars tab returns brand "AttarAura" and/or name includes "attar"');

const combined = filterByAll(items, { tab:'luxury', query:'saffron', notes:['saffron'] });
assert(combined.length === 1, 'Combined filters should narrow to Saffron Oud');

console.log('\nAll filter tests completed.');
