import { assignWith } from '../../src/object/assignWith';

describe('assignWith', () => {
  it('assigns properties with customizer', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const customizer = (objValue: any, srcValue: any) => {
      return objValue === undefined ? srcValue : objValue;
    };

    const result = assignWith(object, source1, source2, customizer);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
  });

  it('handles null and undefined sources', () => {
    const object = { a: 1 };
    const customizer = (objValue: any, srcValue: any) => {
      return objValue === undefined ? srcValue : objValue;
    };
    const result = assignWith(object, null, undefined, { b: 2 }, customizer);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('returns original object if no sources', () => {
    const object = { a: 1 };
    const result = assignWith(object);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
  });

  it('handles non-object target', () => {
    const result = assignWith(null, { a: 1 });
    expect(result).toBe(null);
  });
});
