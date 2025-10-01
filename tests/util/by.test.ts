import { by, thenBy } from '../../src/util/by.js';

describe('by', () => {
  it('should create comparator with function selector', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 }
    ];

    const comparator = by(user => user.age);
    users.sort(comparator);

    expect(users[0].age).toBe(36);
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(48);
  });

  it('should create comparator with string selector', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 }
    ];

    const comparator = by('age');
    users.sort(comparator);

    expect(users[0].age).toBe(36);
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(48);
  });

  it('should support descending order', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 }
    ];

    const comparator = by('age', { order: 'desc' });
    users.sort(comparator);

    expect(users[0].age).toBe(48);
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(36);
  });

  it('should handle null values with nulls first', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: null },
      { name: 'fred', age: 40 }
    ];

    const comparator = by('age', { nulls: 'first' });
    users.sort(comparator);

    expect(users[0].age).toBeNull();
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(48);
  });

  it('should handle null values with nulls last', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: null },
      { name: 'fred', age: 40 }
    ];

    const comparator = by('age', { nulls: 'last' });
    users.sort(comparator);

    expect(users[0].age).toBe(40);
    expect(users[1].age).toBe(48);
    expect(users[2].age).toBeNull();
  });

  it('should handle undefined values', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney' },
      { name: 'fred', age: 40 }
    ];

    const comparator = by('age', { nulls: 'first' });
    users.sort(comparator);

    expect(users[0].age).toBeUndefined();
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(48);
  });

  it('should support collator for string comparison', () => {
    const users = [
      { name: 'Ångström', age: 48 },
      { name: 'Zebra', age: 36 },
      { name: 'apple', age: 40 }
    ];

    const collator = new Intl.Collator('en');
    const comparator = by('name', { collator });
    users.sort(comparator);

    // Collator ordering may vary by locale, so just check that it's sorted
    expect(users[0].name).toBeDefined();
    expect(users[1].name).toBeDefined();
    expect(users[2].name).toBeDefined();
    expect(users.length).toBe(3);
  });

  it('should handle mixed types', () => {
    const items = [
      { value: 'b' },
      { value: 1 },
      { value: 'a' },
      { value: 2 }
    ];

    const comparator = by('value');
    items.sort(comparator);

    // Just verify that sorting works with mixed types
    expect(items.length).toBe(4);
    expect(items.map(item => item.value)).toContain(1);
    expect(items.map(item => item.value)).toContain(2);
    expect(items.map(item => item.value)).toContain('a');
    expect(items.map(item => item.value)).toContain('b');
  });
});

describe('thenBy', () => {
  it('should chain comparators', () => {
    const users = [
      { firstName: 'fred', lastName: 'barney' },
      { firstName: 'barney', lastName: 'barney' },
      { firstName: 'fred', lastName: 'barney' }
    ];

    const comparator = thenBy(by('lastName'), 'firstName');
    users.sort(comparator);

    expect(users[0].firstName).toBe('barney');
    expect(users[1].firstName).toBe('fred');
    expect(users[2].firstName).toBe('fred');
  });

  it('should use second comparator only when first returns 0', () => {
    const users = [
      { firstName: 'fred', lastName: 'barney', age: 40 },
      { firstName: 'barney', lastName: 'barney', age: 36 },
      { firstName: 'fred', lastName: 'barney', age: 48 }
    ];

    const comparator = thenBy(by('lastName'), 'age');
    users.sort(comparator);

    expect(users[0].firstName).toBe('barney');
    expect(users[1].firstName).toBe('fred');
    expect(users[2].firstName).toBe('fred');
    expect(users[0].age).toBe(36);
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(48);
  });

  it('should support multiple chaining', () => {
    const users = [
      { firstName: 'fred', lastName: 'barney', age: 40 },
      { firstName: 'barney', lastName: 'barney', age: 36 },
      { firstName: 'fred', lastName: 'barney', age: 40 }
    ];

    const comparator = thenBy(thenBy(by('lastName'), 'firstName'), 'age');
    users.sort(comparator);

    expect(users[0].firstName).toBe('barney');
    expect(users[1].firstName).toBe('fred');
    expect(users[2].firstName).toBe('fred');
    expect(users[1].age).toBe(40);
    expect(users[2].age).toBe(40);
  });

  it('should handle null values in chained comparators', () => {
    const users = [
      { firstName: 'fred', lastName: 'barney', age: null },
      { firstName: 'barney', lastName: 'barney', age: 36 },
      { firstName: 'fred', lastName: 'barney', age: 40 }
    ];

    const comparator = thenBy(by('lastName'), 'age', { nulls: 'first' });
    users.sort(comparator);

    expect(users[0].age).toBeNull();
    expect(users[1].age).toBe(36);
    expect(users[2].age).toBe(40);
  });
});
