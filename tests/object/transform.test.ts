import { transform } from '../../src/object/transform';

describe('transform', () => {
  it('transforms object properties', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = transform(object, (result: any, value: number, key: string) => {
      result[key + '2'] = value * 2;
    }, {});
    expect(result).toEqual({ a2: 2, b2: 4, c2: 6 });
  });

  it('transforms array elements', () => {
    const array = [1, 2, 3];
    const result = transform(array, (result: any, value: number, index: number) => {
      result[index] = value * 2;
    }, []);
    expect(result).toEqual([2, 4, 6]);
  });

  it('handles empty object', () => {
    const result = transform({}, (result: any, value: any, key: string) => {
      result[key] = value;
    }, {});
    expect(result).toEqual({});
  });

  it('handles empty array', () => {
    const result = transform([], (result: any, value: any, index: number) => {
      result[index] = value;
    }, []);
    expect(result).toEqual([]);
  });

  it('handles null input', () => {
    const result = transform(null, (result: any, value: any, key: string) => {
      result[key] = value;
    }, {});
    expect(result).toEqual({});
  });

  it('handles undefined input', () => {
    const result = transform(undefined, (result: any, value: any, key: string) => {
      result[key] = value;
    }, {});
    expect(result).toEqual({});
  });
});
