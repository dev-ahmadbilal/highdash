import { castArray } from '../../src/lang/castArray';

describe('castArray', () => {
  it('should return array when value is not array', () => {
    expect(castArray(1)).toEqual([1]);
    expect(castArray('hello')).toEqual(['hello']);
    expect(castArray(true)).toEqual([true]);
    expect(castArray(null)).toEqual([null]);
    expect(castArray(undefined)).toEqual([undefined]);
  });

  it('should return array as is when value is array', () => {
    const arr = [1, 2, 3];
    expect(castArray(arr)).toBe(arr);
  });

  it('should work with objects', () => {
    const obj = { a: 1 };
    expect(castArray(obj)).toEqual([obj]);
  });

  it('should work with functions', () => {
    const fn = () => 'hello';
    expect(castArray(fn)).toEqual([fn]);
  });

  it('should work with dates', () => {
    const date = new Date('2023-01-01');
    expect(castArray(date)).toEqual([date]);
  });

  it('should work with regex', () => {
    const regex = /abc/;
    expect(castArray(regex)).toEqual([regex]);
  });

  it('should work with maps', () => {
    const map = new Map();
    expect(castArray(map)).toEqual([map]);
  });

  it('should work with sets', () => {
    const set = new Set();
    expect(castArray(set)).toEqual([set]);
  });

  it('should work with weak maps', () => {
    const weakMap = new WeakMap();
    expect(castArray(weakMap)).toEqual([weakMap]);
  });

  it('should work with weak sets', () => {
    const weakSet = new WeakSet();
    expect(castArray(weakSet)).toEqual([weakSet]);
  });

  it('should work with array buffers', () => {
    const buffer = new ArrayBuffer(8);
    expect(castArray(buffer)).toEqual([buffer]);
  });

  it('should work with typed arrays', () => {
    const uint8Array = new Uint8Array([1, 2, 3]);
    expect(castArray(uint8Array)).toEqual([uint8Array]);
  });

  it('should work with symbols', () => {
    const sym = Symbol('test');
    expect(castArray(sym)).toEqual([sym]);
  });

  it('should work with bigint', () => {
    const bigInt = BigInt(123);
    expect(castArray(bigInt)).toEqual([bigInt]);
  });

  it('should work with nested arrays', () => {
    const nestedArr = [[1, 2], [3, 4]];
    expect(castArray(nestedArr)).toBe(nestedArr);
  });

  it('should work with empty arrays', () => {
    const emptyArr = [];
    expect(castArray(emptyArr)).toBe(emptyArr);
  });

  it('should work with arrays containing different types', () => {
    const mixedArr = [1, 'hello', true, null, undefined, {}, []];
    expect(castArray(mixedArr)).toBe(mixedArr);
  });
});