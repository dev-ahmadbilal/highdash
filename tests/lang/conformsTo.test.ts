import { conformsTo } from '../../src/lang/conformsTo';

describe('conformsTo', () => {
  it('should check if object conforms to predicates', () => {
    const object = { a: 1, b: 2 };
    const source = {
      a: (value: number) => value > 0,
      b: (value: number) => value < 10
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should return false when object does not conform', () => {
    const object = { a: 1, b: 2 };
    const source = {
      a: (value: number) => value > 0,
      b: (value: number) => value > 10
    };
    
    expect(conformsTo(object, source)).toBe(false);
  });

  it('should work with different data types', () => {
    const object = { 
      name: 'John', 
      age: 30, 
      active: true,
      tags: ['red', 'blue']
    };
    const source = {
      name: (value: string) => value.length > 0,
      age: (value: number) => value >= 18,
      active: (value: boolean) => value === true,
      tags: (value: string[]) => value.length > 0
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with nested objects', () => {
    const object = { 
      user: { 
        name: 'John', 
        age: 30 
      } 
    };
    const source = {
      user: (value: any) => value.name && value.age > 18
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with arrays', () => {
    const object = { 
      items: [1, 2, 3],
      count: 3
    };
    const source = {
      items: (value: number[]) => value.length > 0,
      count: (value: number) => value === 3
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with functions', () => {
    const object = { 
      fn: () => 'hello',
      asyncFn: async () => 'world'
    };
    const source = {
      fn: (value: any) => typeof value === 'function',
      asyncFn: (value: any) => typeof value === 'function'
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with dates', () => {
    const object = { 
      date: new Date('2023-01-01'),
      timestamp: 1672531200000
    };
    const source = {
      date: (value: any) => value instanceof Date,
      timestamp: (value: number) => value > 0
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with regex', () => {
    const object = { 
      pattern: /abc/,
      flags: 'g'
    };
    const source = {
      pattern: (value: any) => value instanceof RegExp,
      flags: (value: string) => value.length > 0
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with null and undefined values', () => {
    const object = { 
      value: null,
      other: undefined
    };
    const source = {
      value: (value: any) => value === null,
      other: (value: any) => value === undefined
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with empty object', () => {
    const object = {};
    const source = {};
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should work with empty source', () => {
    const object = { a: 1, b: 2 };
    const source = {};
    
    expect(conformsTo(object, source)).toBe(true);
  });

  it('should handle null and undefined object', () => {
    const source = {
      a: (value: any) => value > 0
    };
    
    expect(conformsTo(null, source)).toBe(false);
    expect(conformsTo(undefined, source)).toBe(false);
  });

  it('should work with complex nested structures', () => {
    const object = {
      user: {
        profile: {
          name: 'John',
          age: 30,
          settings: {
            theme: 'dark',
            notifications: true
          }
        }
      }
    };
    const source = {
      user: (value: any) => value.profile && value.profile.name && value.profile.age > 18
    };
    
    expect(conformsTo(object, source)).toBe(true);
  });
});
