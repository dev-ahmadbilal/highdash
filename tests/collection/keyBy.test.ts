import { keyBy } from '../../src/collection/keyBy';

describe('keyBy', () => {
  it('should create object with keys from iteratee function', () => {
    const array = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 }
    ];
    const result = keyBy(array, 'dir');
    expect(result).toEqual({
      'left': { dir: 'left', code: 97 },
      'right': { dir: 'right', code: 100 }
    });
  });

  it('should create object with keys from property', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    const result = keyBy(array, 'id');
    expect(result).toEqual({
      '1': { id: 1, name: 'John' },
      '2': { id: 2, name: 'Jane' }
    });
  });

  it('should handle empty array', () => {
    expect(keyBy([], 'id')).toEqual({});
  });

  it('should handle null/undefined', () => {
    expect(keyBy(null as any, 'id')).toEqual({});
    expect(keyBy(undefined as any, 'id')).toEqual({});
  });

  it('should handle object input', () => {
    const obj = { a: { id: 1 }, b: { id: 2 } };
    const result = keyBy(obj, 'id');
    expect(result).toEqual({ '1': { id: 1 }, '2': { id: 2 } });
  });
});
