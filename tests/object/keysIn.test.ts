import { keysIn } from '../../src/object/keysIn';

describe('keysIn', () => {
  it('gets keys including inherited', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;
    
    const obj = new Foo();
    const result = keysIn(obj);
    expect(result).toEqual(['a', 'b']);
  });

  it('handles empty object', () => {
    expect(keysIn({})).toEqual([]);
  });

  it('handles object with own properties only', () => {
    expect(keysIn({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  it('handles null input', () => {
    expect(keysIn(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(keysIn(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(keysIn('string')).toEqual([]);
    expect(keysIn(123)).toEqual([]);
    expect(keysIn(true)).toEqual([]);
  });
});
