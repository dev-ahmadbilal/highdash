import { isEqualWith } from '../../src/lang/isEqualWith';

describe('isEqualWith', () => {
  it('should use customizer when provided', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (typeof objValue === 'number' && typeof othValue === 'number') {
        return Math.abs(objValue - othValue) < 1;
      }
      return undefined;
    };

    expect(isEqualWith(1, 1.5, customizer)).toBe(true);
    expect(isEqualWith(1, 2, customizer)).toBe(false);
  });

  it('should fall back to isEqual when customizer returns undefined', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (typeof objValue === 'string' && typeof othValue === 'string') {
        return objValue.toLowerCase() === othValue.toLowerCase();
      }
      return undefined;
    };

    expect(isEqualWith('Hello', 'HELLO', customizer)).toBe(true);
    expect(isEqualWith('Hello', 'World', customizer)).toBe(false);
  });

  it('should work with objects', () => {
    const customizer = (objValue: any, othValue: any, key: string) => {
      if (key === 'id') {
        return true; // Always consider ids equal
      }
      return undefined;
    };

    const obj1 = { id: 1, name: 'John' };
    const obj2 = { id: 2, name: 'John' };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
  });

  it('should work with arrays', () => {
    const customizer = (objValue: any, othValue: any, _key: number) => {
      if (typeof objValue === 'number' && typeof othValue === 'number') {
        return objValue % 2 === othValue % 2;
      }
      return undefined;
    };

    expect(isEqualWith([1, 2, 3], [5, 6, 7], customizer)).toBe(true);
    expect(isEqualWith([1, 2, 3], [2, 4, 6], customizer)).toBe(false);
  });

  it('should work with nested objects', () => {
    const customizer = (objValue: any, othValue: any, key: string) => {
      if (key === 'timestamp') {
        return Math.abs(objValue - othValue) < 1000;
      }
      return undefined;
    };

    const obj1 = { user: { name: 'John', timestamp: 1000 } };
    const obj2 = { user: { name: 'John', timestamp: 1500 } };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
  });

  it('should work with no customizer', () => {
    expect(isEqualWith(1, 1)).toBe(true);
    expect(isEqualWith(1, 2)).toBe(false);
    expect(isEqualWith('hello', 'hello')).toBe(true);
    expect(isEqualWith('hello', 'world')).toBe(false);
  });

  it('should work with null and undefined', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (objValue === null && othValue === undefined) {
        return true;
      }
      return undefined;
    };

    expect(isEqualWith(null, undefined, customizer)).toBe(true);
    expect(isEqualWith(null, null, customizer)).toBe(true);
    expect(isEqualWith(undefined, undefined, customizer)).toBe(true);
  });

  it('should work with functions', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (typeof objValue === 'function' && typeof othValue === 'function') {
        return objValue.toString() === othValue.toString();
      }
      return undefined;
    };

    const fn1 = () => 'hello';
    const fn2 = () => 'hello';
    const fn3 = () => 'world';

    expect(isEqualWith(fn1, fn2, customizer)).toBe(true);
    expect(isEqualWith(fn1, fn3, customizer)).toBe(false);
  });

  it('should work with dates', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (objValue instanceof Date && othValue instanceof Date) {
        return Math.abs(objValue.getTime() - othValue.getTime()) < 1000;
      }
      return undefined;
    };

    const date1 = new Date('2023-01-01T00:00:00Z');
    const date2 = new Date('2023-01-01T00:00:00.500Z');
    const date3 = new Date('2023-01-01T00:00:02Z');

    expect(isEqualWith(date1, date2, customizer)).toBe(true);
    expect(isEqualWith(date1, date3, customizer)).toBe(false);
  });

  it('should work with regex', () => {
    const customizer = (objValue: any, othValue: any) => {
      if (objValue instanceof RegExp && othValue instanceof RegExp) {
        return objValue.source === othValue.source;
      }
      return undefined;
    };

    expect(isEqualWith(/abc/, /abc/, customizer)).toBe(true);
    expect(isEqualWith(/abc/, /def/, customizer)).toBe(false);
  });
});
