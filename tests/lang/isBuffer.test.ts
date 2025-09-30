import { isBuffer } from '../../src/lang/isBuffer';

describe('isBuffer', () => {
  it('should return true for Buffer', () => {
    const buffer = Buffer.from('hello');
    expect(isBuffer(buffer)).toBe(true);
  });

  it('should return true for empty Buffer', () => {
    const buffer = Buffer.alloc(0);
    expect(isBuffer(buffer)).toBe(true);
  });

  it('should return false for array', () => {
    expect(isBuffer([1, 2, 3])).toBe(false);
  });

  it('should return false for Uint8Array', () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(isBuffer(uint8Array)).toBe(false);
  });

  it('should return false for ArrayBuffer', () => {
    const arrayBuffer = new ArrayBuffer(8);
    expect(isBuffer(arrayBuffer)).toBe(false);
  });

  it('should return false for object', () => {
    expect(isBuffer({ a: 1 })).toBe(false);
  });

  it('should return false for string', () => {
    expect(isBuffer('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isBuffer(123)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isBuffer(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isBuffer(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isBuffer(() => {})).toBe(false);
  });
});
