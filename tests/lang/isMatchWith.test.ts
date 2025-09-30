import { isMatchWith } from '../../src/lang/isMatchWith';

describe('isMatchWith', () => {
  it('should use customizer when provided', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'age') {
        return Math.abs(objValue - srcValue) < 5;
      }
      return undefined;
    };

    const object = { name: 'John', age: 30 };
    const source = { name: 'John', age: 32 };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should fall back to isMatch when customizer returns undefined', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'name') {
        return objValue.toLowerCase() === srcValue.toLowerCase();
      }
      return undefined;
    };

    const object = { name: 'John', age: 30 };
    const source = { name: 'JOHN', age: 30 };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with nested objects', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'timestamp') {
        return Math.abs(objValue - srcValue) < 1000;
      }
      return undefined;
    };

    const object = { user: { name: 'John', timestamp: 1000 } };
    const source = { user: { name: 'John', timestamp: 1500 } };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with arrays', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'scores') {
        return objValue.length === srcValue.length;
      }
      return undefined;
    };

    const object = { name: 'John', scores: [1, 2, 3] };
    const source = { name: 'John', scores: [4, 5, 6] };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with no customizer', () => {
    const object = { name: 'John', age: 30 };
    const source = { name: 'John', age: 30 };
    
    expect(isMatchWith(object, source)).toBe(true);
  });

  it('should work with partial matches', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'age') {
        return objValue >= srcValue;
      }
      return undefined;
    };

    const object = { name: 'John', age: 30, city: 'NYC' };
    const source = { name: 'John', age: 25 };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with null and undefined values', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'value') {
        return objValue === null && srcValue === undefined;
      }
      return undefined;
    };

    const object = { name: 'John', value: null };
    const source = { name: 'John', value: undefined };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with functions', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'fn') {
        return typeof objValue === 'function' && typeof srcValue === 'function';
      }
      return undefined;
    };

    const object = { name: 'John', fn: () => 'hello' };
    const source = { name: 'John', fn: () => 'world' };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with dates', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'date') {
        return objValue instanceof Date && srcValue instanceof Date;
      }
      return undefined;
    };

    const object = { name: 'John', date: new Date('2023-01-01') };
    const source = { name: 'John', date: new Date('2023-01-02') };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with regex', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'pattern') {
        return objValue instanceof RegExp && srcValue instanceof RegExp;
      }
      return undefined;
    };

    const object = { name: 'John', pattern: /abc/ };
    const source = { name: 'John', pattern: /def/ };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });

  it('should work with complex nested structures', () => {
    const customizer = (objValue: any, srcValue: any, key: string) => {
      if (key === 'id') {
        return true; // Always consider ids equal
      }
      return undefined;
    };

    const object = {
      user: {
        profile: {
          id: 1,
          name: 'John'
        }
      }
    };
    const source = {
      user: {
        profile: {
          id: 2,
          name: 'John'
        }
      }
    };
    
    expect(isMatchWith(object, source, customizer)).toBe(true);
  });
});
