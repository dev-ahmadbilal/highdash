import { assignIn } from '../../src/object/assignIn';

describe('assignIn', () => {
  it('should assign inherited properties to object', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    function Bar() {
      this.c = 3;
    }
    Bar.prototype.d = 4;

    const object = { a: 0 };
    const result = assignIn(object, new Foo(), new Bar());

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
    expect(result.d).toBe(4);
  });

  it('should work with plain objects', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    const result = assignIn(object, source1, source2);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
  });

  it('should handle null and undefined sources', () => {
    const object = { a: 1 };
    const result = assignIn(object, null, undefined, { b: 2 });

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('should return original object if no sources', () => {
    const object = { a: 1 };
    const result = assignIn(object);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
  });

  it('should handle non-object target', () => {
    const result = assignIn(null, { a: 1 });
    expect(result).toBe(null);
  });

  it('should overwrite properties with later sources', () => {
    const object = { a: 1, b: 2 };
    const source1 = { b: 3, c: 4 };
    const source2 = { c: 5, d: 6 };

    const result = assignIn(object, source1, source2);

    expect(result.b).toBe(3);
    expect(result.c).toBe(5);
    expect(result.d).toBe(6);
  });
});
