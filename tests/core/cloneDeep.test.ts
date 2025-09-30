import { cloneDeep } from '../../src/core/cloneDeep';

describe('cloneDeep', () => {
  it('should clone primitive values', () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('hello')).toBe('hello');
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should clone arrays', () => {
    const original = [1, 2, [3, 4]];
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[2]).not.toBe(original[2]);
  });

  it('should clone objects', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
  });

  it('should clone dates', () => {
    const original = new Date('2023-01-01');
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned instanceof Date).toBe(true);
  });

  it('should clone regexes', () => {
    const original = /test/gi;
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned instanceof RegExp).toBe(true);
  });

  it('should clone maps', () => {
    const original = new Map([['a', 1], ['b', 2]]);
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone sets', () => {
    const original = new Set([1, 2, 3]);
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone typed arrays', () => {
    const original = new Uint8Array([1, 2, 3]);
    const cloned = cloneDeep(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });
});
