import { hasIn } from '../../src/object/hasIn';

describe('hasIn', () => {
  it('checks for inherited properties', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const obj = new Foo();
    expect(hasIn(obj, 'a')).toBe(true);
    expect(hasIn(obj, 'b')).toBe(true);
    expect(hasIn(obj, 'c')).toBe(false);
  });

  it('handles empty object', () => {
    expect(hasIn({}, 'a')).toBe(false);
  });

  it('handles null input', () => {
    expect(hasIn(null, 'a')).toBe(false);
  });

  it('handles undefined input', () => {
    expect(hasIn(undefined, 'a')).toBe(false);
  });

  it('handles non-object input', () => {
    expect(hasIn('string', 'a')).toBe(false);
    expect(hasIn(123, 'a')).toBe(false);
    expect(hasIn(true, 'a')).toBe(false);
  });
});
