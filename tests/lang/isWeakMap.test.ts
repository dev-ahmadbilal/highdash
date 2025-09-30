import { isWeakMap } from '../../src/lang/isWeakMap';

describe('isWeakMap', () => {
  it('should return true for WeakMap', () => {
    const weakMap = new WeakMap();
    expect(isWeakMap(weakMap)).toBe(true);
  });

  it('should return true for empty WeakMap', () => {
    const weakMap = new WeakMap();
    expect(isWeakMap(weakMap)).toBe(true);
  });

  it('should return true for WeakMap with entries', () => {
    const weakMap = new WeakMap();
    const obj1 = {};
    const obj2 = {};
    weakMap.set(obj1, 'value1');
    weakMap.set(obj2, 'value2');
    expect(isWeakMap(weakMap)).toBe(true);
  });

  it('should return false for Map', () => {
    const map = new Map();
    expect(isWeakMap(map)).toBe(false);
  });

  it('should return false for Set', () => {
    const set = new Set();
    expect(isWeakMap(set)).toBe(false);
  });

  it('should return false for WeakSet', () => {
    const weakSet = new WeakSet();
    expect(isWeakMap(weakSet)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isWeakMap([])).toBe(false);
  });

  it('should return false for object', () => {
    expect(isWeakMap({})).toBe(false);
  });

  it('should return false for string', () => {
    expect(isWeakMap('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isWeakMap(123)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isWeakMap(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isWeakMap(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isWeakMap(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isWeakMap(() => {})).toBe(false);
  });

  it('should return false for Date', () => {
    expect(isWeakMap(new Date())).toBe(false);
  });

  it('should return false for RegExp', () => {
    expect(isWeakMap(/abc/)).toBe(false);
  });

  it('should return false for ArrayBuffer', () => {
    expect(isWeakMap(new ArrayBuffer(8))).toBe(false);
  });
});
