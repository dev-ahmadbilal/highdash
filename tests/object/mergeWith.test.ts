import { mergeWith } from '../../src/object/mergeWith';

describe('mergeWith', () => {
  it('merges with customizer for arrays (concatenate)', () => {
    const object = { a: [1] } as any;
    const other = { a: [2] } as any;
    const customizer = (objValue: any, srcValue: any) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
      return undefined;
    };
    const result = mergeWith(object, other, customizer);
    expect(result.a).toEqual([1, 2]);
  });
  it('falls back to default merge', () => {
    const result = mergeWith({ a: { b: 1 } }, { a: { c: 2 } }, () => undefined);
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });
});
