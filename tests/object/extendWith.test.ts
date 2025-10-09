import { extendWith } from '../../src/object/extendWith';

describe('extendWith', () => {
  it('assigns inherited properties with customizer', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    function Bar() {
      this.c = 3;
    }
    Bar.prototype.d = 4;

    const object = { a: 0 };
    const customizer = (objValue: any, srcValue: any) => {
      if (objValue === 0) return srcValue;
      return objValue;
    };

    const result = extendWith(object, new Foo(), new Bar(), customizer);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
    expect(result.d).toBe(4);
  });

  it('works with plain objects', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const customizer = (objValue: any, srcValue: any) => {
      return objValue === undefined ? srcValue : objValue;
    };

    const result = extendWith(object, source1, source2, customizer);

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
    const result = extendWith(object, null, undefined, { b: 2 }, customizer);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('returns original object if no sources', () => {
    const object = { a: 1 };
    const result = extendWith(object);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
  });

  it('handles non-object target', () => {
    const result = extendWith(null, { a: 1 });
    expect(result).toBe(null);
  });

  it('overwrites properties with later sources', () => {
    const object = { a: 1, b: 2 };
    const source1 = { b: 3, c: 4 };
    const source2 = { c: 5, d: 6 };
    const customizer = (objValue: any, srcValue: any) => {
      return objValue === undefined ? srcValue : objValue;
    };

    const result = extendWith(object, source1, source2, customizer);

    expect(result.b).toBe(3);
    expect(result.c).toBe(5);
    expect(result.d).toBe(6);
  });
});
