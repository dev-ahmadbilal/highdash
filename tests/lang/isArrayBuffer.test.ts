import { isArrayBuffer } from '../../src/lang/isArrayBuffer';

describe('isArrayBuffer', () => {
  it('should return true for ArrayBuffer', () => {
    const buffer = new ArrayBuffer(8);
    expect(isArrayBuffer(buffer)).toBe(true);
  });

  it('should return true for empty ArrayBuffer', () => {
    const buffer = new ArrayBuffer(0);
    expect(isArrayBuffer(buffer)).toBe(true);
  });

  it('should return false for Buffer', () => {
    const buffer = Buffer.from('hello');
    expect(isArrayBuffer(buffer)).toBe(false);
  });

  it('should return false for Uint8Array', () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isArrayBuffer(uint8Array)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isArrayBuffer([1, 2, 3])).toBe(false);
  });

  it('should return false for object', () => {
    expect(isArrayBuffer({})).toBe(false);
  });

  it('should return false for string', () => {
    expect(isArrayBuffer('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isArrayBuffer(123)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isArrayBuffer(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isArrayBuffer(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isArrayBuffer(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isArrayBuffer(() => {})).toBe(false);
  });

  it('should return false for Date', () => {
    expect(isArrayBuffer(new Date())).toBe(false);
  });

  it('should return false for RegExp', () => {
    expect(isArrayBuffer(/abc/)).toBe(false);
  });

  it('should return false for Map', () => {
    expect(isArrayBuffer(new Map())).toBe(false);
  });

  it('should return false for Set', () => {
    expect(isArrayBuffer(new Set())).toBe(false);
  });
});
