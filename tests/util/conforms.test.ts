import { conforms } from '../../src/util/conforms.js';

describe('conforms', () => {
  it('should create function that checks if object conforms to predicates', () => {
    const objects = [
      { 'a': 2, 'b': 1 },
      { 'a': 1, 'b': 2 }
    ];

    const predicate = conforms({ 'b': function(n: number) { return n > 1; } });
    const result = objects.filter(predicate);

    expect(result).toEqual([{ 'a': 1, 'b': 2 }]);
  });

  it('should return true when all predicates pass', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0,
      'b': (n: number) => n < 10
    });

    const obj = { 'a': 5, 'b': 3 };
    expect(predicate(obj)).toBe(true);
  });

  it('should return false when any predicate fails', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0,
      'b': (n: number) => n < 10
    });

    const obj = { 'a': 5, 'b': 15 };
    expect(predicate(obj)).toBe(false);
  });

  it('should return false for null/undefined object', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0
    });

    expect(predicate(null)).toBe(false);
    expect(predicate(undefined)).toBe(false);
  });

  it('should return false for non-object', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0
    });

    expect(predicate('string')).toBe(false);
    expect(predicate(123)).toBe(false);
  });

  it('should return false when predicate is not a function', () => {
    const predicate = conforms({
      'a': 'not a function' as any
    });

    const obj = { 'a': 5 };
    expect(predicate(obj)).toBe(false);
  });

  it('should handle empty source object', () => {
    const predicate = conforms({});
    const obj = { 'a': 5 };
    expect(predicate(obj)).toBe(true);
  });

  it('should handle missing properties', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0,
      'b': (n: number) => n < 10
    });

    const obj = { 'a': 5 }; // missing 'b'
    expect(predicate(obj)).toBe(false);
  });

  it('should handle undefined properties', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0,
      'b': (n: number) => n < 10
    });

    const obj = { 'a': 5, 'b': undefined };
    expect(predicate(obj)).toBe(false);
  });

  it('should work with complex predicates', () => {
    const predicate = conforms({
      'name': (n: string) => typeof n === 'string' && n.length > 0,
      'age': (n: number) => typeof n === 'number' && n >= 0,
      'active': (n: boolean) => typeof n === 'boolean'
    });

    const validObj = { 'name': 'John', 'age': 30, 'active': true };
    const invalidObj = { 'name': '', 'age': -5, 'active': 'yes' };

    expect(predicate(validObj)).toBe(true);
    expect(predicate(invalidObj)).toBe(false);
  });

  it('should handle inherited properties', () => {
    const predicate = conforms({
      'a': (n: number) => n > 0
    });

    const parent = { 'a': 5 };
    const child = Object.create(parent);

    expect(predicate(child)).toBe(true);
  });
});
