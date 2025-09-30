import { isWeakSet } from '../../src/lang/isWeakSet';

describe('isWeakSet', () => {
  it('should return true for WeakSet', () => {
    const weakSet = new WeakSet();
    expect(isWeakSet(weakSet)).toBe(true);
  });

  it('should return true for empty WeakSet', () => {
    const weakSet = new WeakSet();
    expect(isWeakSet(weakSet)).toBe(true);
  });

  it('should return true for WeakSet with entries', () => {
    const weakSet = new WeakSet();
    const obj1 = {};
    const obj2 = {};
    weakSet.add(obj1);
    weakSet.add(obj2);
    expect(isWeakSet(weakSet)).toBe(true);
  });

  it('should return false for Set', () => {
    const set = new Set();
    expect(isWeakSet(set)).toBe(false);
  });

  it('should return false for Map', () => {
    const map = new Map();
    expect(isWeakSet(map)).toBe(false);
  });

  it('should return false for WeakMap', () => {
    const weakMap = new WeakMap();
    expect(isWeakSet(weakMap)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isWeakSet([])).toBe(false);
  });

  it('should return false for object', () => {
    expect(isWeakSet({})).toBe(false);
  });

  it('should return false for string', () => {
    expect(isWeakSet('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isWeakSet(123)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isWeakSet(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isWeakSet(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isWeakSet(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isWeakSet(() => {})).toBe(false);
  });

  it('should return false for Date', () => {
    expect(isWeakSet(new Date())).toBe(false);
  });

  it('should return false for RegExp', () => {
    expect(isWeakSet(/abc/)).toBe(false);
  });

  it('should return false for ArrayBuffer', () => {
    expect(isWeakSet(new ArrayBuffer(8))).toBe(false);
  });
});
