import { invoke } from '../../src/object/invoke';

describe('invoke', () => {
  it('invokes method at path', () => {
    const object: any = { a: [{ b: { c: () => 'hello' } }] };
    const result = invoke(object, 'a[0].b.c');
    expect(result).toBe('hello');
  });

  it('invokes method with arguments', () => {
    const object: any = { a: { b: { c: (x: number, y: number) => x + y } } };
    const result = invoke(object, 'a.b.c', 1, 2);
    expect(result).toBe(3);
  });

  it('returns undefined if method does not exist', () => {
    const object: any = { a: { b: { c: 1 } } };
    const result = invoke(object, 'a.b.c');
    expect(result).toBeUndefined();
  });

  it('handles null input', () => {
    const result = invoke(null, 'a.b.c');
    expect(result).toBeUndefined();
  });

  it('handles undefined input', () => {
    const result = invoke(undefined, 'a.b.c');
    expect(result).toBeUndefined();
  });

  it('handles non-object input', () => {
    const result = invoke('string', 'a.b.c');
    expect(result).toBeUndefined();
  });
});
