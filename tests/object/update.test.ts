import { update } from '../../src/object/update';

describe('update', () => {
  it('updates value at path', () => {
    const object: any = { a: [{ b: { c: 3 } }] };
    const result = update(object, 'a[0].b.c', (n: number) => n * n);
    expect(result).toBe(object);
    expect(object.a[0].b.c).toBe(9);
  });

  it('creates nested structure if path does not exist', () => {
    const object: any = {};
    update(object, 'a[0].b.c', (n: number) => (n ? n * n : 0));
    expect(object.a[0].b.c).toBe(0);
  });

  it('handles customizer for creating objects', () => {
    const object: any = {};
    const customizer = (nsValue: any, key: string) => {
      return nsValue === undefined ? (isFinite(Number(key)) ? [] : {}) : nsValue;
    };
    update(object, 'a[0].b.c', (n: number) => (n ? n * n : 0), customizer);
    expect(object.a[0].b.c).toBe(0);
  });

  it('handles null input', () => {
    const result = update(null, 'a.b', (n: number) => (n ? n * n : 0));
    expect(result).toBe(null);
  });

  it('handles undefined input', () => {
    const result = update(undefined, 'a.b', (n: number) => (n ? n * n : 0));
    expect(result).toBe(undefined);
  });
});
