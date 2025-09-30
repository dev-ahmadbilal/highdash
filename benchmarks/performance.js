/* eslint-disable no-console */
/**
 * Simple performance benchmarks for Highdash functions
 * Run with: node benchmarks/performance.js
 */

const { performance } = require('perf_hooks');
const { debounce, throttle, cloneDeep, merge, uniq, groupBy } = require('../lib/index.js');

function measureTime(name, fn, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const time = end - start;
  console.log(`${name}: ${time.toFixed(2)}ms (${(time / iterations).toFixed(4)}ms per operation)`);
}

console.log('Highdash Performance Benchmarks\n');

// Test data
const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i, value: Math.random() }));
const largeObject = Object.fromEntries(largeArray.map(item => [item.id, item]));

// Debounce benchmark
console.log('=== Debounce ===');
const debouncedFn = debounce(() => {}, 10);
measureTime('Debounce (1000 calls)', () => {
  debouncedFn();
});

// Throttle benchmark
console.log('\n=== Throttle ===');
const throttledFn = throttle(() => {}, 10);
measureTime('Throttle (1000 calls)', () => {
  throttledFn();
});

// CloneDeep benchmark
console.log('\n=== CloneDeep ===');
const complexObject = {
  a: 1,
  b: [1, 2, { c: 3 }],
  d: { e: { f: 4 } },
  g: new Date(),
  h: new Map([['key', 'value']]),
  i: new Set([1, 2, 3])
};
measureTime('CloneDeep (1000 operations)', () => {
  cloneDeep(complexObject);
});

// Merge benchmark
console.log('\n=== Merge ===');
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
measureTime('Merge (1000 operations)', () => {
  merge(obj1, obj2);
});

// Uniq benchmark
console.log('\n=== Uniq ===');
const duplicateArray = Array.from({ length: 1000 }, (_, i) => Math.floor(i / 2));
measureTime('Uniq (1000 operations)', () => {
  uniq(duplicateArray);
});

// GroupBy benchmark
console.log('\n=== GroupBy ===');
measureTime('GroupBy (1000 operations)', () => {
  groupBy(largeArray, 'id');
});

console.log('\nBenchmarks completed!');
