import { entriesIn } from '../../src/object/entriesIn';

describe('entriesIn', () => {
  it('gets entries including inherited', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const obj = new Foo();
    const result = entriesIn(obj);
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('handles empty object', () => {
    expect(entriesIn({})).toEqual([]);
  });

  it('handles object with own properties only', () => {
    expect(entriesIn({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('handles null input', () => {
    expect(entriesIn(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(entriesIn(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(entriesIn('string')).toEqual([]);
    expect(entriesIn(123)).toEqual([]);
    expect(entriesIn(true)).toEqual([]);
  });
});
