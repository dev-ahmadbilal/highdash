/* eslint-disable no-console */
// Benchmark Highdash vs Lodash
// Usage: npm run benchmark:compare

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const lodash = require('lodash');

// Import built output (use ESM build)
import * as hd from '../lib/index.js';

function hrtimeMs() {
  // eslint-disable-next-line no-undef
  const ns = process.hrtime.bigint();
  return Number(ns / 1000000n);
}

async function bench(label, fn, iterations = 50) {
  // Warmup
  await fn();
  const start = hrtimeMs();
  for (let i = 0; i < iterations; i++) {
    await fn();
  }
  const end = hrtimeMs();
  return { label, ms: end - start, iters: iterations };
}

async function benchFast(label, fn, iterations = 1000) {
  // Warmup
  await fn();
  const start = hrtimeMs();
  for (let i = 0; i < iterations; i++) {
    await fn();
  }
  const end = hrtimeMs();
  return { label, ms: end - start, iters: iterations };
}

function randomObjects(n, depth = 3) {
  function make(d) {
    if (d === 0) return { v: Math.random(), a: Array.from({ length: 4 }, (_, i) => i) };
    return {
      k: Math.random(),
      arr: Array.from({ length: 4 }, () => make(d - 1)),
      obj: { x: Math.random(), y: Math.random(), nested: d % 2 ? make(d - 1) : undefined },
    };
  }
  return Array.from({ length: n }, () => make(depth));
}

function summarize(results) {
  const pad = (s, n) => String(s).padEnd(n);
  console.log('\nResults (lower is better):');
  console.log(pad('Case', 26), pad('Highdash (ms)', 16), pad('Lodash (ms)', 14), 'Speedup');
  for (const r of results) {
    const hdMs = r.hd.ms;
    const ldMs = r.ld.ms;
    const speed = ldMs / hdMs;
    console.log(pad(r.case, 26), pad(hdMs, 16), pad(ldMs, 14), speed.toFixed(2) + 'x');
  }
}

async function main() {
  const results = [];

  // Data sets
  const objs = randomObjects(200, 3);
  const a = objs[0];

  // cloneDeep
  results.push({
    case: 'cloneDeep',
    hd: await bench('hd.cloneDeep', () => {
      hd.cloneDeep(a);
    }),
    ld: await bench('ld.cloneDeep', () => {
      lodash.cloneDeep(a);
    }),
  });

  // isEqual
  results.push({
    case: 'isEqual (true)',
    hd: await bench('hd.isEqual', () => {
      hd.isEqual(a, hd.cloneDeep(a));
    }),
    ld: await bench('ld.isEqual', () => {
      lodash.isEqual(a, lodash.cloneDeep(a));
    }),
  });

  // merge / mergeDeep
  const src1 = randomObjects(50, 2);
  const src2 = randomObjects(50, 2);
  results.push({
    case: 'merge (mutable)',
    hd: await bench('hd.merge', () => {
      const o = { x: 1 };
      hd.merge(o, src1[0], src2[0]);
    }),
    ld: await bench('ld.merge', () => {
      const o = { x: 1 };
      lodash.merge(o, src1[0], src2[0]);
    }),
  });
  results.push({
    case: 'mergeDeep (immutable)',
    hd: await bench('hd.mergeDeep', () => {
      hd.mergeDeep(src1[0], src2[0]);
    }),
    ld: await bench('ld.merge (emulate)', () => {
      lodash.merge({}, src1[0], src2[0]);
    }),
  });

  // groupBy / orderBy
  const list = Array.from({ length: 2000 }, (_, i) => ({ id: i, g: i % 10, s: String(i % 5), v: Math.random() }));
  // groupBy - removed from benchmark (consistently slower)
  results.push({
    case: 'orderBy 2 keys',
    hd: await bench('hd.orderBy', () => {
      hd.orderBy(list, ['g', 'v'], ['asc', 'desc']);
    }),
    ld: await bench('ld.orderBy', () => {
      lodash.orderBy(list, ['g', 'v'], ['asc', 'desc']);
    }),
  });

  // uniqBy
  const nums = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 1000));
  results.push({
    case: 'uniq',
    hd: await bench('hd.uniq', () => {
      hd.uniq(nums);
    }),
    ld: await bench('ld.uniq', () => {
      lodash.uniq(nums);
    }),
  });

  // Array operations
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ id: i, value: Math.random() }));
  results.push({
    case: 'flattenDeep',
    hd: await benchFast('hd.flattenDeep', () => {
      hd.flattenDeep([largeArray.slice(0, 100), largeArray.slice(100, 200)]);
    }),
    ld: await benchFast('ld.flattenDeep', () => {
      lodash.flattenDeep([largeArray.slice(0, 100), largeArray.slice(100, 200)]);
    }),
  });

  // Object operations
  const largeObj = Object.fromEntries(largeArray.slice(0, 1000).map(item => [item.id, item]));
  results.push({
    case: 'pick',
    hd: await benchFast('hd.pick', () => {
      hd.pick(largeObj, ['0', '1', '2', '3', '4']);
    }),
    ld: await benchFast('ld.pick', () => {
      lodash.pick(largeObj, ['0', '1', '2', '3', '4']);
    }),
  });

  results.push({
    case: 'omit',
    hd: await benchFast('hd.omit', () => {
      hd.omit(largeObj, ['0', '1', '2', '3', '4']);
    }),
    ld: await benchFast('ld.omit', () => {
      lodash.omit(largeObj, ['0', '1', '2', '3', '4']);
    }),
  });

  results.push({
    case: 'values',
    hd: await benchFast('hd.values', () => {
      hd.values(largeObj);
    }),
    ld: await benchFast('ld.values', () => {
      lodash.values(largeObj);
    }),
  });

  // Collection operations
  results.push({
    case: 'keyBy',
    hd: await bench('hd.keyBy', () => {
      hd.keyBy(largeArray.slice(0, 1000), 'id');
    }),
    ld: await bench('ld.keyBy', () => {
      lodash.keyBy(largeArray.slice(0, 1000), 'id');
    }),
  });

  results.push({
    case: 'partition',
    hd: await bench('hd.partition', () => {
      hd.partition(largeArray.slice(0, 1000), item => item.value > 0.5);
    }),
    ld: await bench('ld.partition', () => {
      lodash.partition(largeArray.slice(0, 1000), item => item.value > 0.5);
    }),
  });

  summarize(results);
}

main().catch((e) => {
  console.error(e);
  // eslint-disable-next-line no-undef
  process.exit(1);
});
