import { toPlainObject } from '../../src/lang/toPlainObject';

describe('toPlainObject', () => {
  it('should convert object to plain object', () => {
    const obj = { a: 1, b: 2 };
    const result = toPlainObject(obj);
    
    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).not.toBe(obj);
  });

  it('should convert array to plain object', () => {
    const arr = [1, 2, 3];
    const result = toPlainObject(arr);
    
    expect(result).toEqual({ '0': 1, '1': 2, '2': 3 });
  });

  it('should convert string to plain object', () => {
    const str = 'hello';
    const result = toPlainObject(str);
    
    expect(result).toEqual({ '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' });
  });

  it('should convert number to plain object', () => {
    const num = 123;
    const result = toPlainObject(num);
    
    expect(result).toEqual({});
  });

  it('should convert boolean to plain object', () => {
    const bool = true;
    const result = toPlainObject(bool);
    
    expect(result).toEqual({});
  });

  it('should convert null to plain object', () => {
    const result = toPlainObject(null);
    
    expect(result).toEqual({});
  });

  it('should convert undefined to plain object', () => {
    const result = toPlainObject(undefined);
    
    expect(result).toEqual({});
  });

  it('should convert function to plain object', () => {
    const fn = () => 'hello';
    const result = toPlainObject(fn);
    
    expect(result).toEqual({});
  });

  it('should convert date to plain object', () => {
    const date = new Date('2023-01-01');
    const result = toPlainObject(date);
    
    expect(result).toEqual({});
  });

  it('should convert regex to plain object', () => {
    const regex = /abc/;
    const result = toPlainObject(regex);
    
    expect(result).toEqual({});
  });

  it('should convert map to plain object', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    const result = toPlainObject(map);
    
    expect(result).toEqual({});
  });

  it('should convert set to plain object', () => {
    const set = new Set([1, 2, 3]);
    const result = toPlainObject(set);
    
    expect(result).toEqual({});
  });

  it('should convert weak map to plain object', () => {
    const weakMap = new WeakMap();
    const result = toPlainObject(weakMap);
    
    expect(result).toEqual({});
  });

  it('should convert weak set to plain object', () => {
    const weakSet = new WeakSet();
    const result = toPlainObject(weakSet);
    
    expect(result).toEqual({});
  });

  it('should convert array buffer to plain object', () => {
    const buffer = new ArrayBuffer(8);
    const result = toPlainObject(buffer);
    
    expect(result).toEqual({});
  });

  it('should convert typed array to plain object', () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    const result = toPlainObject(uint8Array);
    
    expect(result).toEqual({ '0': 1, '1': 2, '2': 3 });
  });

  it('should convert symbol to plain object', () => {
    const sym = Symbol('test');
    const result = toPlainObject(sym);
    
    expect(result).toEqual({});
  });

  it('should convert bigint to plain object', () => {
    const bigInt = BigInt(123);
    const result = toPlainObject(bigInt);
    
    expect(result).toEqual({});
  });

  it('should convert nested objects to plain objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const result = toPlainObject(obj);
    
    expect(result).toEqual({ a: { b: { c: 1 } } });
    expect(result).not.toBe(obj);
  });

  it('should convert objects with mixed types', () => {
    const obj = { 
      a: 1, 
      b: 'hello', 
      c: true, 
      d: null, 
      e: undefined,
      f: [1, 2, 3],
      g: { x: 1 }
    };
    const result = toPlainObject(obj);
    
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it('should convert empty structures', () => {
    expect(toPlainObject({})).toEqual({});
    expect(toPlainObject([])).toEqual({});
    expect(toPlainObject('')).toEqual({});
  });

  it('should convert objects with special properties', () => {
    const obj = { 
      constructor: 'test',
      prototype: 'test',
      __proto__: 'test'
    };
    const result = toPlainObject(obj);
    
    expect(result).toEqual(obj);
  });

  it('should convert objects with numeric keys', () => {
    const obj = { '0': 'a', '1': 'b', '2': 'c' };
    const result = toPlainObject(obj);
    
    expect(result).toEqual(obj);
  });

  it('should convert objects with symbol keys', () => {
    const sym = Symbol('key');
    const obj = { [sym]: 'value' };
    const result = toPlainObject(obj);
    
    expect(result).toEqual(obj);
  });
});
