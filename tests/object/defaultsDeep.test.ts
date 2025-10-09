import { defaultsDeep } from '../../src/object/defaultsDeep';

describe('defaultsDeep', () => {
  it('should assign default values deeply', () => {
    const object = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    const defaults = {
      a: {
        b: {
          c: 2,
          d: 3,
        },
        e: 4,
      },
      f: 5,
    };

    const result = defaultsDeep(object, defaults);

    expect(result).toBe(object);
    expect(result.a.b.c).toBe(1); // Original value preserved
    expect(result.a.b.d).toBe(3); // Default value assigned
    expect(result.a.e).toBe(4); // Default value assigned
    expect(result.f).toBe(5); // Default value assigned
  });

  it('should work with multiple default objects', () => {
    const object = { a: 1 };
    const defaults1 = { b: 2, c: { d: 3 } };
    const defaults2 = { c: { e: 4 }, f: 5 };

    const result = defaultsDeep(object, defaults1, defaults2);

    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c.d).toBe(3);
    expect(result.c.e).toBe(4);
    expect(result.f).toBe(5);
  });

  it('should handle null and undefined values', () => {
    const object = { a: null, b: undefined };
    const defaults = { a: 1, b: 2, c: 3 };

    const result = defaultsDeep(object, defaults);

    expect(result.a).toBe(null); // null is not replaced
    expect(result.b).toBe(2); // undefined is replaced
    expect(result.c).toBe(3); // missing property is added
  });

  it('should handle arrays', () => {
    const object = { items: [1, 2] };
    const defaults = { items: [3, 4, 5], count: 0 };

    const result = defaultsDeep(object, defaults);

    expect(result.items).toBe(object.items); // Original array preserved
    expect(result.count).toBe(0); // Default value assigned
  });

  it('should return original object if no defaults', () => {
    const object = { a: 1 };
    const result = defaultsDeep(object);

    expect(result).toBe(object);
    expect(result.a).toBe(1);
  });

  it('should handle non-object target', () => {
    const result = defaultsDeep(null, { a: 1 });
    expect(result).toBe(null);
  });

  it('should handle nested objects with different structures', () => {
    const object = {
      user: {
        name: 'John',
        settings: {
          theme: 'dark',
        },
      },
    };

    const defaults = {
      user: {
        age: 30,
        settings: {
          language: 'en',
          notifications: true,
        },
      },
      version: '1.0',
    };

    const result = defaultsDeep(object, defaults);

    expect(result.user.name).toBe('John');
    expect(result.user.age).toBe(30);
    expect(result.user.settings.theme).toBe('dark');
    expect(result.user.settings.language).toBe('en');
    expect(result.user.settings.notifications).toBe(true);
    expect(result.version).toBe('1.0');
  });
});
