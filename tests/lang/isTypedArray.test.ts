import { isTypedArray } from '../../src/lang/isTypedArray';

describe('isTypedArray', () => {
  it('should return true for Int8Array', () => {
    expect(isTypedArray(new Int8Array())).toBe(true);
  });

  it('should return true for Uint8Array', () => {
    expect(isTypedArray(new Uint8Array())).toBe(true);
  });

  it('should return true for Uint8ClampedArray', () => {
    expect(isTypedArray(new Uint8ClampedArray())).toBe(true);
  });

  it('should return true for Int16Array', () => {
    expect(isTypedArray(new Int16Array())).toBe(true);
  });

  it('should return true for Uint16Array', () => {
    expect(isTypedArray(new Uint16Array())).toBe(true);
  });

  it('should return true for Int32Array', () => {
    expect(isTypedArray(new Int32Array())).toBe(true);
  });

  it('should return true for Uint32Array', () => {
    expect(isTypedArray(new Uint32Array())).toBe(true);
  });

  it('should return true for Float32Array', () => {
    expect(isTypedArray(new Float32Array())).toBe(true);
  });

  it('should return true for Float64Array', () => {
    expect(isTypedArray(new Float64Array())).toBe(true);
  });

  it('should return true for BigInt64Array', () => {
    expect(isTypedArray(new BigInt64Array())).toBe(true);
  });

  it('should return true for BigUint64Array', () => {
    expect(isTypedArray(new BigUint64Array())).toBe(true);
  });

  it('should return false for regular arrays', () => {
    expect(isTypedArray([])).toBe(false);
    expect(isTypedArray([1, 2, 3])).toBe(false);
  });

  it('should return false for ArrayBuffer', () => {
    expect(isTypedArray(new ArrayBuffer(8))).toBe(false);
  });

  it('should return false for objects', () => {
    expect(isTypedArray({})).toBe(false);
    expect(isTypedArray({ a: 1 })).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isTypedArray('string')).toBe(false);
    expect(isTypedArray(123)).toBe(false);
    expect(isTypedArray(true)).toBe(false);
    expect(isTypedArray(null)).toBe(false);
    expect(isTypedArray(undefined)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isTypedArray(() => {})).toBe(false);
  });
});
