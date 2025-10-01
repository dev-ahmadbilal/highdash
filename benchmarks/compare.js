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
  results.push({
    case: 'groupBy',
    hd: await bench('hd.groupBy', () => {
      hd.groupBy(list, 'g');
    }),
    ld: await bench('ld.groupBy', () => {
      lodash.groupBy(list, 'g');
    }),
  });
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

  summarize(results);
}

main().catch((e) => {
  console.error(e);
  // eslint-disable-next-line no-undef
  process.exit(1);
});
