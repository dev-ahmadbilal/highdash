import { clone } from '../../src/lang/clone';

describe('clone', () => {
  it('should clone primitive values', () => {
    expect(clone(1)).toBe(1);
    expect(clone('hello')).toBe('hello');
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const cloned = clone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('should clone objects', () => {
    const obj = { a: 1, b: 2 };
    const cloned = clone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('should clone nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = clone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
  });

  it('should clone arrays with objects', () => {
    const arr = [{ a: 1 }, { b: 2 }];
    const cloned = clone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]);
    expect(cloned[1]).not.toBe(arr[1]);
  });

  it('should clone dates', () => {
    const date = new Date('2023-01-01');
    const cloned = clone(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned instanceof Date).toBe(true);
  });

  it('should clone regex', () => {
    const regex = /abc/g;
    const cloned = clone(regex);

    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
    expect(cloned instanceof RegExp).toBe(true);
  });

  it('should clone maps', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const cloned = clone(map);

    expect(cloned).toEqual(map);
    expect(cloned).not.toBe(map);
    expect(cloned instanceof Map).toBe(true);
  });

  it('should clone sets', () => {
    const set = new Set([1, 2, 3]);
    const cloned = clone(set);

    expect(cloned).toEqual(set);
    expect(cloned).not.toBe(set);
    expect(cloned instanceof Set).toBe(true);
  });

  it('should clone weak maps', () => {
    const weakMap = new WeakMap();
    const cloned = clone(weakMap);

    expect(cloned).toEqual(weakMap);
    expect(cloned).not.toBe(weakMap);
    expect(cloned instanceof WeakMap).toBe(true);
  });

  it('should clone weak sets', () => {
    const weakSet = new WeakSet();
    const cloned = clone(weakSet);

    expect(cloned).toEqual(weakSet);
    expect(cloned).not.toBe(weakSet);
    expect(cloned instanceof WeakSet).toBe(true);
  });

  it('should clone array buffers', () => {
    const buffer = new ArrayBuffer(8);
    const cloned = clone(buffer);

    expect(cloned).toEqual(buffer);
    expect(cloned).not.toBe(buffer);
    expect(cloned instanceof ArrayBuffer).toBe(true);
  });

  it('should clone typed arrays', () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    const cloned = clone(uint8Array);

    expect(cloned).toEqual(uint8Array);
    expect(cloned).not.toBe(uint8Array);
    expect(cloned instanceof Uint8Array).toBe(true);
  });

  it('should clone symbols', () => {
    const sym = Symbol('test');
    const cloned = clone(sym);

    expect(cloned).toBe(sym); // Symbols are immutable
  });

  it('should clone bigint', () => {
    const bigInt = BigInt(123);
    const cloned = clone(bigInt);

    expect(cloned).toBe(bigInt); // BigInts are immutable
  });

  it('should clone functions', () => {
    const fn = () => 'hello';
    const cloned = clone(fn);

    expect(cloned).toBe(fn); // Functions are not cloned
  });

  it('should clone complex nested structures', () => {
    const obj = {
      a: 1,
      b: [2, 3],
      c: {
        d: 4,
        e: [5, 6],
      },
    };
    const cloned = clone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.c).not.toBe(obj.c);
    expect(cloned.c.e).not.toBe(obj.c.e);
  });

  it('should clone empty structures', () => {
    expect(clone([])).toEqual([]);
    expect(clone({})).toEqual({});
    expect(clone(new Map())).toEqual(new Map());
    expect(clone(new Set())).toEqual(new Set());
  });
});
