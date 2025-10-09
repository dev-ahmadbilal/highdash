import { updateWith } from '../../src/object/updateWith';

describe('updateWith', () => {
  it('updates value at path with customizer', () => {
    const object: any = { a: [{ b: { c: 3 } }] };
    const customizer = (nsValue: any, key: string) => {
      return nsValue === undefined ? (isFinite(Number(key)) ? [] : {}) : nsValue;
    };
    const result = updateWith(object, 'a[0].b.c', (n: number) => n * n, customizer);
    expect(result).toBe(object);
    expect(object.a[0].b.c).toBe(9);
  });

  it('creates nested structure if path does not exist', () => {
    const object: any = {};
    const customizer = (nsValue: any, key: string) => {
      return nsValue === undefined ? (isFinite(Number(key)) ? [] : {}) : nsValue;
    };
    updateWith(object, 'a[0].b.c', (n: number) => (n ? n * n : 0), customizer);
    expect(object.a[0].b.c).toBe(0);
  });

  it('handles null input', () => {
    const result = updateWith(null, 'a.b', (n: number) => (n ? n * n : 0));
    expect(result).toBe(null);
  });

  it('handles undefined input', () => {
    const result = updateWith(undefined, 'a.b', (n: number) => (n ? n * n : 0));
    expect(result).toBe(undefined);
  });
});
