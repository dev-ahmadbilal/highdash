import { compact } from '../../src/array/compact';

describe('compact', () => {
  it('should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(compact(null as any)).toEqual([]);
    expect(compact(undefined as any)).toEqual([]);
  });

  it('should handle all falsy values', () => {
    expect(compact([false, 0, '', null, undefined, NaN])).toEqual([]);
  });

  it('should handle all truthy values', () => {
    expect(compact([1, 'hello', true, {}, []])).toEqual([1, 'hello', true, {}, []]);
  });
});
