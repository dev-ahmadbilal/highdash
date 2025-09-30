import { invertBy } from '../../src/object/invertBy';

describe('invertBy', () => {
  it('inverts object with iteratee', () => {
    const object = { a: 1, b: 2, c: 1 };
    const result = invertBy(object, (value: number) => 'group' + value);
    expect(result).toEqual({ group1: ['a', 'c'], group2: ['b'] });
  });

  it('inverts object with property iteratee', () => {
    const object = { a: { x: 1 }, b: { x: 2 }, c: { x: 1 } };
    const result = invertBy(object, 'x');
    expect(result).toEqual({ '1': ['a', 'c'], '2': ['b'] });
  });

  it('handles empty object', () => {
    const result = invertBy({}, (value: any) => value);
    expect(result).toEqual({});
  });

  it('handles null input', () => {
    const result = invertBy(null, (value: any) => value);
    expect(result).toEqual({});
  });

  it('handles undefined input', () => {
    const result = invertBy(undefined, (value: any) => value);
    expect(result).toEqual({});
  });

  it('handles non-object input', () => {
    const result = invertBy('string', (value: any) => value);
    expect(result).toEqual({});
  });
});
